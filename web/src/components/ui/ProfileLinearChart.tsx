"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ProfileLinearChart() {
  return (
    <Card className="flex flex-col max-w-lg">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription className="text-xl font-bold text-gray-400">
            Total Contributions
          </CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-lg font-lg text-gray-200">
            62
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            resting: {
              label: "Resting",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={[
              {
                date: "2024-01-01",
                resting: 62,
              },
              {
                date: "2024-02-01",
                resting: 72,
              },
              {
                date: "2024-03-01",
                resting: 35,
              },
              {
                date: "2024-04-01",
                resting: 62,
              },
              {
                date: "2024-05-01",
                resting: 52,
              },
              {
                date: "2024-06-01",
                resting: 62,
              },
              {
                date: "2024-07-01",
                resting: 70,
              },
            ]}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short", // Change this to display months
                });
              }}
            />
            <Line
              dataKey="resting"
              type="natural"
              fill="var(--color-resting)"
              stroke="var(--color-resting)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-resting)",
                stroke: "var(--color-resting)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
