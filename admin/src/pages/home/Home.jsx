import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import "./home.css"
// import { userData } from "../../dummydata"
import WidgetSmall from "../../components/widgetsmall/WidgetSmall";
import WidgetLarge from "../../components/widgetlarge/WidgetLarge";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
export default function Home() {
    const [userStats, setUserStats] = useState([])

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    )

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats")
                //console.log(res.data)
                const stats = res.data.map((item) => ({
                    name: MONTHS[item._id - 1],
                    "Active User": item.total


                    //console.log(MONTHS[item._id - 1]),

                    // setUserStats((prev) => [
                    //     ...prev,
                    //     { name: MONTHS[item._id - 1], "Active User": item.total }
                    // ])

                }))
                setUserStats(stats)


            } catch (err) {

            }
        }
        getStats();
    }, [MONTHS]);

    //console.log(userStats)

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={userStats}
                title="User Analytics"
                grid="true"
                datakey="Active User"
            />
            <div className="homeWidgets">
                <WidgetSmall />
                <WidgetLarge />
            </div>
        </div>
    );
}
