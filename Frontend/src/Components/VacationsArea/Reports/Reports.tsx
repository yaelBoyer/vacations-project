import ReactApexCharts from 'react-apexcharts';
import { NavLink } from 'react-router-dom';
import vacationService from '../../../Services/VacationService';
import notifyService from '../../../Services/NotifyService';
import { useEffect, useState } from 'react';
import useVerifyLoggedIn from '../../../Utils/UseVerifyLoggedIn';




interface ChartProps {
    series: ApexAxisChartSeries;
}

const options: ApexCharts.ApexOptions = {
    chart: {
        stacked: false,
        stackType: '100%'
        , toolbar: {
            show: false
        }
        , parentHeightOffset: 1
        , sparkline: {
            enabled: false
        }
    }
    , plotOptions: {
        bar: {
            horizontal: false,
            barHeight: '100'
        }
    }
    , title: {
        text: 'Followers Report',
        align: 'center',
        style: {fontFamily:
            "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", 
            fontSize: '30px',
            fontWeight: 'none',
            color: 'rgb(38,160,252)'}
    },
    stroke: {
        width: 1,
        colors: [ 'green']
    },

    

    tooltip: {
        enabled: true,
        y: {
            formatter: function (val) {
                return val + ''
            }
        }
    },
    fill: {
        opacity: 1
    },

    legend: {
        position: 'top'
        , horizontalAlign: 'center'
        , floating: false
    },
     grid: {
        show: true
    }
}
// extends Component<AppProps, AppState>
function Reports(): JSX.Element {

    useVerifyLoggedIn()
    

    const [data, setData] = useState<ChartProps>();

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => {
                let followers = vacations.filter(v => v.followersCount > 0);
                setData({
                    series: [{
                        name: "followers",
                        data: followers.map(v => { return { x: v.destination, y: v.followersCount } }),
                        color:  'rgb(38,160,252)' 
                    }]
                });

            })
            .catch(err => notifyService.error(err));
    }, [])

    return (
        <div className='Reports'>
            {data && <ReactApexCharts type='bar' height={500} options={options} series={data.series}/>}
            <NavLink to="/vacations">Back to vacations</NavLink>
        </div>

    );

}

export default Reports;

