import { ethers } from "ethers";

export default function VestingTable({ schedules }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-white/20">
            <th>Amount</th>
            <th>Release</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((v: any) => {
            const unlocked =
              Date.now() >
              new Date(Number(v.releaseTime)*1000).getTime();

            return (
              <tr key={v._id} className="border-b border-white/10">
                <td>{ethers.formatEther(v.amount)} CCT</td>
                <td>
                  {new Date(Number(v.releaseTime)*1000).toLocaleString()}
                </td>
                <td
                  className={
                    unlocked
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {unlocked ? "Claimable" : "Locked"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
