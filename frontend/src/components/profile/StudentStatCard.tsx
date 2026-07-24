import type { ReactNode } from "react";

interface StudentStatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
    suffix?: string;
}

const StudentStatCard = ({
    title,
    value,
    icon,
    color,
    suffix
}: StudentStatCardProps) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
    {value}
    {suffix}
</h2>
                </div>

                <div className={`rounded-full p-4 ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StudentStatCard;