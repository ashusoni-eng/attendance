import LeaveBalanceCards from "../components/LeaveBalanceCards";
import LeaveForm from "../components/LeaveForm";

export default function ApplyLeavePage() {
  return (
    <div className="p-6">
      <LeaveBalanceCards />
      <LeaveForm />
    </div>
  );
}
