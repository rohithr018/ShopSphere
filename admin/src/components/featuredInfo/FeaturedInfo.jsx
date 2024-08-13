import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material"
import "./FeaturedInfo.css"
export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$234</span>
                    <span className="featuredMoneyRate">
                        $-11.4<ArrowDownwardRounded className="featuredIcon negative" />
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
