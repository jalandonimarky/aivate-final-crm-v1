import { DollarSign, Users, Briefcase, CheckSquare, TrendingUp, AlertCircle, Package, Code } from "lucide-react"; // Removed XCircle
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useCRMData } from "@/hooks/useCRMData";
import { Skeleton } from "@/components/ui/skeleton";

export function Dashboard() {
  const { stats, loading } = useCRMData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Welcome back! 
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Paid Deals"
          value={`$${stats.paidDealsValue.toLocaleString()}`}
          icon={DollarSign}
          change={{ value: 12.5, trend: "up" }}
        />
        {/* Removed Cancelled Deals StatsCard */}
        <StatsCard
          title="Pipeline Value"
          value={`$${stats.pipelineValue.toLocaleString()}`}
          icon={TrendingUp}
          change={{ value: 15.3, trend: "up" }}
        />
        <StatsCard
          title="Active Contacts"
          value={stats.totalContacts}
          icon={Users}
          change={{ value: 8.2, trend: "up" }}
        />
        <StatsCard
          title="Pending Tasks"
          value={stats.totalTasks - stats.completedTasks}
          icon={CheckSquare}
          change={{ value: -5.1, trend: "down" }}
        />
        {/* New Stats Cards for Tiers */}
        <StatsCard
          title="1-OFF Projects"
          value={stats.totalOneOffProjects}
          icon={Package}
          className="lg:col-span-2"
        />
        <StatsCard
          title="System Development"
          value={stats.totalSystemDevelopment}
          icon={Code}
          className="lg:col-span-2"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart
            paidDeals={stats.paidDealsValue}
            doneCompletedDeals={stats.doneCompletedDealsValue}
            cancelledDeals={stats.cancelledDealsValue} // Pass cancelled deals value
            pipelineValue={stats.pipelineValue}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <QuickActions />
          
          {/* Alerts */}
          {stats.overdueTasks > 0 && (
            <div className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <h3 className="font-semibold text-warning">Overdue Tasks</h3>
                  <p className="text-sm text-muted-foreground">
                    You have {stats.overdueTasks} overdue tasks that need attention.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}