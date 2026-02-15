// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vesting is Ownable {
    IERC20 public immutable token;

    struct Schedule {
        uint256 amount;
        uint256 releaseTime;
        bool claimed;
    }

    mapping(address => Schedule[]) public schedules;

    event ScheduledCreated(
        address indexed beneficiary,
        uint256 amount,
        uint256 releaseTime
    );

    event TokensClaimed(
        address indexed beneficiary,
        uint256 amount
    );

    constructor(address _token, address initialOwner) Ownable(initialOwner){
        require(_token != address(0), "Invalid token address!");
        token = IERC20(_token);
    }

    function createSchedule (address beneficiary, uint256 amount, uint256 releaseTime) external onlyOwner{
        require(beneficiary != address(0), "Invalid Beneficiary!");
        require(amount > 0, "Amount should be greater 0");
        require(releaseTime > block.timestamp, "Invalid release time!");

        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer Failed!");

        schedules[beneficiary].push(
            Schedule({
                amount: amount,
                releaseTime: releaseTime,
                claimed: false
            })
        );

        emit ScheduledCreated(beneficiary, amount, releaseTime);
    }

    function claim() external{
        Schedule[] storage userSchedules = schedules[msg.sender];

        uint256 totalClaimable = 0;

        for(uint256 i = 0; i<userSchedules.length; i++){
            Schedule storage schedule = userSchedules[i];
            if(!schedule.claimed && block.timestamp >= schedule.releaseTime){
                totalClaimable += schedule.amount;
                schedule.claimed = true;
            }
        }
        require(totalClaimable > 0, "No claimable amount left!");

        bool success = token.transfer(msg.sender, totalClaimable);
        require(success, "Transfer Failed!");

        emit TokensClaimed(msg.sender, totalClaimable);
    }

    function getSchedules(address user) external view returns(Schedule[] memory){
        return schedules[user]; 
    }
}