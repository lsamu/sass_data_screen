export default [
    {
        title: "图表",
        icon: "",
        children: [
            {
                title: "折线图",
                componentName: "BoxEChartLine",
                hidden: false,
                locked: false,
            },
            {
                id: "histogram",
                name: "柱状图",
                title: "柱状图",
                componentName: "BoxEChartHistogram",
                hidden: false,
                locked: false,
            },
            {
                title: "条形图",
                componentName: "BoxEChartBar",
                hidden: false,
                locked: false,
            },
            {
                title: "饼图",
                componentName: "BoxEChartPie",
                hidden: false,
                locked: false,
            },
            {
                title: "环状图",
                componentName: "BoxEChartRing",
                hidden: false,
                locked: false,
            },
            {
                title: "漏斗图",
                componentName: "BoxEChartFunnel",
                hidden: false,
                locked: false,
            },
            {
                title: "雷达图",
                componentName: "BoxEChartRadar",
                hidden: false,
                locked: false,
            },
            {
                title: "中国地图",
                componentName: "BoxEChartMap",
                hidden: false,
                locked: false,
            },
            {
                title: "水球图",
                componentName: "BoxEChartLiquidfill",
                hidden: false,
                locked: false,
            },
        ]
    },
    {
        title: "文字",
        icon: "",
        children: [
            {
                title: "文本",
                componentName: "BoxEChartText",
                hidden: false,
                locked: false,
            },
            {
                title: "时间",
                componentName: "BoxEChartDateTime",
                hidden: false,
                locked: false,
            },
            {
                title: "Iframe",
                componentName: "BoxEChartIframe",
                hidden: false,
                locked: false,
            },
            {
                title: "跑马灯",
                componentName: "BoxEChartIframe",
                hidden: false,
                locked: false,
            },
            {
                title: "超链接",
                componentName: "BoxEChartIframe",
                hidden: false,
                locked: false,
            },
        ]
    },
    {
        title: "媒体",
        icon: "",
        children: [
            {
                title: "图片",
                componentName: "BoxEChartImage",
                hidden: false,
                locked: false,
            },
            {
                title: "图片框",
                componentName: "BoxEChartImageBorder",
                hidden: false,
                locked: false,
            },
            {
                title: "轮播图",
                componentName: "BoxEChartSwiper",
                hidden: false,
                locked: false,
            },
            {
                title: "音乐",
                componentName: "BoxEChartMusic",
                hidden: false,
                locked: false,
            },
            {
                title: "视频",
                componentName: "BoxEChartVedio",
                hidden: false,
                locked: false,
            },
            {
                title: "视频流",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            }
        ]
    },
    {
        title: "指标",
        icon: "",
        children: [
            {
                title: "翻牌器",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            },
            {
                title: "颜色块",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            },
            {
                title: "环形图",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            },
            {
                title: "进度条",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            },
            {
                title: "仪表盘",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            },
            {
                title: "字符云",
                componentName: "BoxEChartHls",
                hidden: false,
                locked: false,
            }
        ]
    },
    {
        title: "表格",
        icon: "",
        children: [
            {
                title: "表格",
                componentName: "BoxEChartTable",
                hidden: false,
                locked: false,
            },
            {
                title: "选项卡",
                componentName: "BoxEChartTable",
                hidden: false,
                locked: false,
            },
            {
                title: "折叠项",
                componentName: "BoxEChartTable",
                hidden: false,
                locked: false,
            },
        ]
    },
    {
        title: "其他组件",
        icon: "",
        children: [
            {
                title: "按钮",
                componentName: "dv-button",
                hidden: false,
                locked: false,
            },
            {
                title: "锥形柱图",
                componentName: "dv-conical-column-chart",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        data: [
                            {
                                name: '周口',
                                value: 55,
                            },
                            {
                                name: '南阳',
                                value: 120,
                            },
                            {
                                name: '西峡',
                                value: 71,
                            },
                            {
                                name: '驻马店',
                                value: 66,
                            },
                            {
                                name: '新乡',
                                value: 80,
                            },
                            {
                                name: '信阳',
                                value: 35,
                            },
                            {
                                name: '漯河',
                                value: 15,
                            },
                        ]
                    }
                }
            },
            {
                title: "进度池",
                componentName: "dv-percent-pond",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        value: 66,
                    }
                }
            },
            {
                title: "水位图",
                componentName: "dv-water-level-pond",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        data: [66],
                    }
                }
            },
            {
                title: "加载",
                componentName: "dv-loading",
                hidden: false,
                locked: false,
            },
            {
                title: "飞线图增强版",
                componentName: "dv-flyline-chart-enhanced",
                hidden: false,
                locked: false,
            },
            {
                title: "飞线图",
                componentName: "dv-flyline-chart",
                hidden: false,
                locked: false,
            },
            {
                title: "排名轮播表",
                componentName: "dv-scroll-ranking-board",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        data: [
                            {
                                name: '周口',
                                value: 55,
                            },
                            {
                                name: '南阳',
                                value: 120,
                            },
                            {
                                name: '西峡',
                                value: 78,
                            },
                            {
                                name: '驻马店',
                                value: 66,
                            },
                            {
                                name: '新乡',
                                value: 80,
                            },
                            {
                                name: '信阳',
                                value: 45,
                            },
                            {
                                name: '漯河',
                                value: 29,
                            },
                        ],
                        unit: '万元',
                    }
                }
            },
            {
                title: "轮播表",
                componentName: "dv-scroll-board",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        header: ['列1', '列2', '列3'],
                        data: [
                            ['行1列1', '行1列2', '行1列3'],
                            ['行2列1', '行2列2', '行2列3'],
                            ['行3列1', '行3列2', '行3列3'],
                            ['行4列1', '行4列2', '行4列3'],
                            ['行5列1', '行5列2', '行5列3'],
                            ['行6列1', '行6列2', '行6列3'],
                            ['行7列1', '行7列2', '行7列3'],
                            ['行8列1', '行8列2', '行8列3'],
                            ['行9列1', '行9列2', '行9列3'],
                            ['行10列1', '行10列2', '行10列3'],
                        ],
                        index: true,
                        columnWidth: [50],
                        align: ['center'],
                    }
                }
            },
            {
                title: "图表",
                componentName: "dv-charts",
                hidden: false,
                locked: false,
                props: {
                    option: {
                        title: {
                            text: '剩余油量表',
                            style: {
                                fill: '#fff'
                            }
                        },
                        series: [
                            {
                                type: 'gauge',
                                data: [{ name: 'itemA', value: 55 }],
                                center: ['50%', '55%'],
                                axisLabel: {
                                    formatter: '{value}%',
                                    style: {
                                        fill: '#fff'
                                    }
                                },
                                axisTick: {
                                    style: {
                                        stroke: '#fff'
                                    }
                                },
                                animationCurve: 'easeInOutBack'
                            }
                        ]
                    }
                }
            },
            {
                title: "胶囊柱图",
                componentName: "dv-capsule-chart",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        data: [
                            {
                                name: '南阳',
                                value: 167
                            },
                            {
                                name: '周口',
                                value: 123
                            },
                            {
                                name: '漯河',
                                value: 98
                            },
                            {
                                name: '郑州',
                                value: 75
                            },
                            {
                                name: '西峡',
                                value: 66
                            },
                        ],
                        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                        unit: '万元'
                    }
                }
            },
            {
                title: "动态环图",
                componentName: "dv-active-ring-chart",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        lineWidth: 24,
                        digitalFlopStyle: {
                            fill: 'pink',
                        },
                        data: [
                            {
                                name: '杭州',
                                value: 98,
                            },
                            {
                                name: '金华',
                                value: 150,
                            },
                            {
                                name: '宁波',
                                value: 62,
                            },
                            {
                                name: '太原',
                                value: 54,
                            },
                        ],
                    }
                }
            },
            {
                title: "数字翻牌器",
                componentName: "dv-digital-flop",
                hidden: false,
                locked: false,
                props: {
                    config: {
                        number: [100],
                        content: '{nt}个',
                    }
                }
            },
        ],
    },
    {
        title: "边框",
        icon: "",
        children: [
            {
                title: "边框1",
                componentName: "dv-border-box1",
                hidden: false,
                locked: false,
            },
            {
                title: "边框2",
                componentName: "dv-border-box2",
                hidden: false,
                locked: false,
            },
            {
                title: "边框3",
                componentName: "dv-border-box3",
                hidden: false,
                locked: false,
            },
            {
                title: "边框4",
                componentName: "dv-border-box4",
                hidden: false,
                locked: false,
            },
            {
                title: "边框5",
                componentName: "dv-border-box5",
                hidden: false,
                locked: false,
            },
            {
                title: "边框6",
                componentName: "dv-border-box6",
                hidden: false,
                locked: false,
            },
            {
                title: "边框7",
                componentName: "dv-border-box7",
                hidden: false,
                locked: false,
            },
            {
                title: "边框8",
                componentName: "dv-border-box8",
                hidden: false,
                locked: false,
            },
            {
                title: "边框9",
                componentName: "dv-border-box9",
                hidden: false,
                locked: false,
            },
            {
                title: "边框10",
                componentName: "dv-border-box10",
                hidden: false,
                locked: false,
            },
            {
                title: "边框11",
                componentName: "dv-border-box11",
                hidden: false,
                locked: false,
            },
            {
                title: "边框12",
                componentName: "dv-border-box12",
                hidden: false,
                locked: false,
            },
            {
                title: "边框13",
                componentName: "dv-border-box13",
                hidden: false,
                locked: false,
            },
        ]
    },
    {
        title: "装饰",
        icon: "",
        children: [
            {
                title: "装饰1",
                componentName: "dv-decoration-1",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰2",
                componentName: "dv-decoration-2",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰3",
                componentName: "dv-decoration-3",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰4",
                componentName: "dv-decoration-4",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰5",
                componentName: "dv-decoration-5",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰6",
                componentName: "dv-decoration-8",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰7",
                componentName: "dv-decoration-7",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰8",
                componentName: "dv-decoration-8",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰9",
                componentName: "dv-decoration-9",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰10",
                componentName: "dv-decoration-10",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰11",
                componentName: "dv-decoration-11",
                hidden: false,
                locked: false,
            },
            {
                title: "装饰12",
                componentName: "dv-decoration-12",
                hidden: false,
                locked: false,
            },
        ]
    }
]