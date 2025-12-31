import LeaveBalanceCards from "../components/LeaveBalanceCard";
import LeaveForm from "../components/LeaveForm";

export default function ApplyLeavePage() {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto space-y-6">
      <LeaveBalanceCards />
      <LeaveForm />
    </div>
  );
}
