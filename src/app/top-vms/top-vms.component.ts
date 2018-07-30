import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-vms',
  templateUrl: './top-vms.component.html',
  styleUrls: ['./top-vms.component.css']
})
export class TopVmsComponent implements OnInit {


  public vMs: any = {
    backgroundColor: ['#2F3642'],
    title: {
        text: 'Top Ten VMs',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: '{b} <br> Vm Number {c}%'
    },
    /*legend: {
        data: [date]
    },*/
    grid: {
        left: '4%',
        right: '4%',
        bottom: '2%',
        containLabel: true
    },
     xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        min: 0,
        max: 200,
        interval: 20,
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#fff',
                fontWeight: '80'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'gray',
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'gray',
            }
        },
    },
   yAxis: {
        type: 'category',
        data: ['vm', 'vim', 'vimmy', 'vimmer', 'vimzy', 'vimzer', 'vimza', 'vimvam', 'vamshalam', 'vambro'],
        axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            margin: 10,
            inside: false,
            textStyle: {
                color: '#fff',
                fontWeight: '50'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'gray',
            },
        }
    },
     visualMap: [{
        min: 0,
        max: 200,
            dimension: 0,
            right: 0,
            itemWidth: 0,
            textStyle: {
                color: '#ddd'
            },
            inRange: {
                color: ['#E7FCD1', '#D7FAB4', '#DEF98E', '#DDFB63', '#C1E045', '#AAC930', '#92AF22', '#7F9624', '#6A7B26', '#566225']
            }
        }],
    series: [{
        type: 'bar',
        label: {
            normal: {
                show: true,
                // formatter: '{c}',
                formatter: function(v) {
                    const val = v.data;
                    if (val === 0) {
                        return '';
                    }
                    return val;
                },
                color: '#fff'
            }
        },
        data: [22, 33, 44, 55, 66, 77, 88, 99, 167, 200],
         markLine: {
            lineStyle: {
                normal: {
                    color: '#ff0000'
                }
            },
            data: [{
                xAxis: 130
            }],
        },
    }]

};

  constructor() { }

  ngOnInit() {
  }

}
