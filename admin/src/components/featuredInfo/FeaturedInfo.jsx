import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethods"
import "./FeaturedInfo.css"
export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
    const [previousMonthRevenue, setPreviousMonthRevenue] = useState(0);
    const [month, setMonth] = useState(0)

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getIncome();
    }, []);

    useEffect(() => {
        if (income.length > 0) {
            const currentMonth = new Date().getMonth() + 1;
            const previousMonth = currentMonth - 1;

            const currentMonthData = income.find(item => item._id === currentMonth);
            const previousMonthData = income.find(item => item._id === previousMonth);

            const currentRevenue = currentMonthData ? currentMonthData.total : 0;
            const previousRevenue = previousMonthData ? previousMonthData.total : 0;

            setCurrentMonthRevenue(currentRevenue);
            setPreviousMonthRevenue(previousRevenue);

            if (previousRevenue !== 0) {
                setPercentage(((currentRevenue - previousRevenue) * 100) / previousRevenue);
            } else {
                setPercentage(0);
            }
        }
    }, [income]);
    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income")
                setIncome(res.data);

                setMonth(new Date().currentDate.getMonth() + 1)

                setCurrentMonthRevenue(income.find(item => item._id === month).total)
                setPreviousMonthRevenue(income.find(item => item._id === (month - 1)).total)



                setPercentage((currentMonthRevenue * 100) / previousMonthRevenue - 100);
                //console.log(res.data)
                //console.log((res.data[1].total * 100) / res.data[0].total - 100)
            } catch (err) {

            }
        }
        getIncome()

    }, [currentMonthRevenue, previousMonthRevenue, month])

    //console.log(income)
    //console.log(income[0]?.total)

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">${currentMonthRevenue}</span>
                    <span className="featuredMoneyRate">
                        % {percentage.toFixed(2)}{" "}
                        {percentage < 0
                            ? (
                                <ArrowDownwardRounded className="featuredIcon negative" />
                            )
                            : (
                                <ArrowUpwardRounded className="featuredIcon" />
                            )
                        }
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$234</span>
                    <span className="featuredMoneyRate">
                        $-11.4<ArrowDownwardRounded className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$234</span>
                    <span className="featuredMoneyRate">
                        $11.4<ArrowUpwardRounded className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
