
let wb; //读取完成的数据

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

        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据

        let excelData = {
            x: [],
            y: []
        };

        for (const key in sheetData) {
            if (sheetData.hasOwnProperty(key)) {
                const element = sheetData[key];



                excelData.x.push(Number(element.x));
                excelData.y.push(Number(element.y));
            }
        }

        let jsonData = JSON.stringify(excelData);

        console.log(jsonData);





    };

    reader.readAsBinaryString(f);
}
