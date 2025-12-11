"use client";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import CardBox from '../shared/CardBox';
import { Select } from 'flowbite-react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StudentOverview = () => {
    type ViewOption = "major" | "semester";

    const [view, setView] = useState<ViewOption>("major");
    const [stats, setStats] = useState<any>(null);
    const [isFetched, setIsFetched] = useState(false);

    async function fetchStats() {
        try {
            const response = await fetch("/api/students/stats");
            const data = await response.json();
            setStats(data);
            setIsFetched(true);
        } catch (error) {
            console.error("Failed to fetch student stats", error);
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    const chartData = isFetched ? (view === "major" ? stats.majorData : stats.semesterData) : { categories: [], series: [] };

    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: { show: true },
            height: 370,
        },
        colors: ["var(--color-primary)", "var(--color-secondary)"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: { show: false },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: chartData?.categories || [],
            axisBorder: { show: false },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    return (
        <CardBox className='pb-0'>
            <div className="sm:flex items-center justify-between mb-6">
                <div>
                    <h5 className="card-title">Student Overview</h5>
                    <p className="text-sm text-muted-foreground">Total Students: {stats?.totalStudents || 0}</p>
                </div>
                <div className="sm:mt-0 mt-4">
                    <Select
                        className="form-control select-md"
                        value={view}
                        onChange={(e) => setView(e.target.value as ViewOption)}
                    >
                        <option value="major">By Major</option>
                        <option value="semester">By Semester</option>
                    </Select>
                </div>
            </div>

            {isFetched && (
                <Chart
                    options={optionscolumnchart}
                    series={chartData?.series || []}
                    type="bar"
                    height={370}
                    width="100%"
                />
            )}
        </CardBox>
    );
};

export default StudentOverview;
