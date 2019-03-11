
let wb; //读取完成的数据
// let chartData;

let excelData = {
    x: [],
    y: []
};

function importf(obj) { //导入
    if (!obj.files) {
        return;
    }
    let f = obj.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;

        wb = XLSX.read(data, {
            type: 'binary'
        });

        // let sheetData = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        let sheetData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // console.log('sheetData: ', sheetData);

        //wb.SheetNames[0]是获取 Sheets 中第一个 Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据


        for (const key in sheetData) {
            if (sheetData.hasOwnProperty(key)) {
                const element = sheetData[key];

                excelData.x.push(Number(element.x));
                excelData.y.push(Number(element.y));
            }
        }
        // 转成json数据
        // let jsonData = JSON.stringify(excelData);

        // console.log('jsonData', jsonData);

        setMyChartData(excelData);
    };

    reader.readAsBinaryString(f);
}

function setMyChartData(chartData) {
    let myChart = echarts.init(document.getElementById('echartDemo'));

    let option = {
        title: {
            text: '河道断面'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['河道断面']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : chartData.x
            }
        ],
        yAxis : [
            {
                type : 'value',
                max: 1100
            }
        ],
        series : [
            {
                name:'河道断面',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:chartData.y
            }
        ]
    };
    
    
    
    myChart.setOption(option);
}



