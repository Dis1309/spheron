"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "./card";
import { ChartContainer } from "./chart";

export default function ProfilePieChart() {
  return (
    <Card className="max-w-lg">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xl font-bold text-gray-400">Critical</div>
            <div className="flex items-baseline gap-1 text-lg font-lg text-gray-200">
              23
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xl font-bold text-gray-400">High</div>
            <div className="flex items-baseline gap-1 text-lg font-lg text-gray-200">
              73
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xl font-bold text-gray-400">low</div>
            <div className="flex items-baseline gap-1 text-lg font-lg text-gray-200">
              8
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            move: {
              label: "Move",
              color: "hsl(var(--chart-1))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-2))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity: "stand",
                value: (8 / 12) * 100,
                fill: "var(--color-stand)",
              },
              {
                activity: "exercise",
                value: (46 / 60) * 100,
                fill: "var(--color-exercise)",
              },
              {
                activity: "move",
                value: (245 / 360) * 100,
                fill: "var(--color-move)",
              },
            ]}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
