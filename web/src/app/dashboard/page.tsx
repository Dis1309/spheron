"use client";
import AllProjectList from "../../components/ui/AllProjectList";
import {
  Bar,
  BarChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Briefcase, Users } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

// mock data for the bar chart
const barChartdata = [
  { name: "TS", total: 2200 },
  { name: "ReactJs", total: 1200 },
  { name: "NodeJs", total: 1900 },
  { name: "NextJs", total: 1500 },
  { name: "AI", total: 1000 },
  { name: "Tailwind", total: 2800 },
  { name: "Html", total: 2500 },
  { name: "Css", total: 3000 },
  { name: "Python", total: 2800 },
  { name: "Java", total: 3500 },
  { name: "JS", total: 3200 },
  { name: "C++", total: 3700 },
  { name: "C#", total: 4000 },
];

// mock data for the pie chart
const pieChartData = [
  { browser: "critical", payment: 275, fill: "#3c2e3d" },
  { browser: "high", payment: 200, fill: "#6e5a6f" },
  { browser: "low", payment: 187, fill: "#9a809d" },
];

const pieChartConfig = {
  payment: {
    label: "Payment",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--chart-1))",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function Dashboard() {

  const {account} = useWallet();
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary">
        Welcome back, {account?.address
    ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}`
    : "No account connected"}
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects Listed
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +31% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Contributors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              +58% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-start justify-start w-full gap-x-5">
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution by Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartdata}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#a69cb6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex-1 max-h-max">
          <CardHeader>
            <CardTitle>Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent nameKey="payment" hideLabel />
                    }
                  />
                  <Pie data={pieChartData} dataKey="payment">
                    <LabelList
                      dataKey="browser"
                      position="inside"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                      formatter={(value: keyof typeof pieChartConfig) =>
                        pieChartConfig[value]?.label
                      }
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <button> Approval</button>
      <AllProjectList />
    </div>
  );
}
