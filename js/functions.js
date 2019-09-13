console.log('Import works');
var theme = 'themed';
var tBody, dataView = 'table', ganttDataArr = [];

const testData = [
  {request_id: 6944, request_name: "19-00750 5J GRUMMAN test", start_date: "2019-08-07",end_date: "2019-10-24","color":"#f2f0f4", textColor: "#9c9a9e"},
  {request_id: 6706, request_name: "ADAM HILL test", start_date: "2019-09-02",end_date: "2019-10-10","color":"#9c9a9e", textColor:"#ffffff"},
  {request_id: 6670, request_name: "5D LEVITTOWN test", start_date: "2019-09-02",end_date: "2019-10-14","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6929, request_name: "19-00744 5X NEW SOUTH ROAD test", start_date: "2019-09-10",end_date: "2019-11-19","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6779, request_name: "5K SYOSSET test", start_date: "2019-09-10",end_date: "2019-10-01","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6772, request_name: "AND", start_date: "2019-09-10",end_date: "2019-09-20","color":"#ff9800", textColor: "#ffffff"},
  {request_id: 6924, request_name: "Not available", start_date: "2019-09-10",end_date: "2019-12-06","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6928, request_name: "19-00743 ADAM HILL test", start_date: "2019-09-10",end_date: "2019-12-18","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6782, request_name: "ADAM HILL test", start_date: "2019-09-10",end_date: "2019-09-18","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6936, request_name: "5K SYOSSET test", start_date: "2019-09-10",end_date: "2019-11-07","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6927, request_name: "5X NEW SOUTH ROAD test", start_date: "2019-09-10",end_date: "2019-12-09","color":"#65c16f", textColor: "#ffffff"},
  {request_id: 6778, request_name: "5K SYOSSET test", start_date: "2019-09-10",end_date: "2019-10-01","color":"#ff9800", textColor: "#ffffff"},
  {request_id: 6925, request_name: "19-00742 5X NEW SOUTH ROAD test", start_date: "2019-09-10",end_date: "2019-11-19","color":"#9c9a9e", textColor: "#ffffff"},
  {request_id: 6737, request_name: "19-00585 5J GRUMMAN test", start_date: "2019-09-10",end_date: "2019-10-18","color":"#65c16f", textColor: "#ffffff"},
  {request_id: 6739, request_name: "19-00587 5J GRUMMAN test", start_date: "2019-09-10",end_date: "2019-10-10","color":"#65c16f", textColor: "#ffffff"},
  {request_id: 6775, request_name: "19-00615 GCL", start_date: "2019-09-10",end_date: "2019-09-30","color":"#f2f0f4", textColor: "#9c9a9e"},
  {request_id: 6916, request_name: "19-00735", start_date: "2019-09-10",end_date: "2019-09-19","color":"#f2f0f4", textColor: "#9c9a9e"},
  {request_id: 6920, request_name: "19-00738 5K SYOSSET test", start_date: "2019-09-10",end_date: "2019-10-02","color":"#FF5722", textColor: "#ffffff"},
  {request_id: 6921, request_name: "19-00739 5J GRUMMAN Test", start_date: "2019-09-10",end_date: "2019-10-18","color":"#FF5722", textColor: "#ffffff"},
  {request_id: 6731, request_name: "19-00582 WATTERSON WT-69KV TR 1", start_date: "2019-09-11",end_date: "2019-09-19","color":"#ff9800", textColor: "#ffffff"}
  
];

changeDataView('table');
renderTableData();

function getGantTestData() {
  return testData;
}

function onRange(e) {
	console.log(e.value);
  document.getElementById("rangeVal").innerHTML = e.value;
}

function renderTableData() {
  tBody = document.getElementById("service-list-body");
  var txt = '';
  for (let i in testData) {
    const td = testData[i];
    txt += `
    <tr>
    <td>${Number(i) + 1}</td>
    <td><a href="https://sunnetqa.anblicks.com/itoa/outage/view.htmlx?editedOutage.appId=${td.request_id}" target="_blank">view</a></td>
    <td>${td.request_name}</td>
    <td>${GTIF(td.start_date)}</td>
    <td>${GTIF(td.end_date)}</td>
    <td class="text-center">${getDur(td.start_date, td.end_date)}</td>
    </tr>`;
  }
  tBody.innerHTML = txt;
}

// get duration
function getDur(sd, ed) {
  const start = new Date(sd).getTime();
  const end = new Date(ed).getTime();
  return ((end - start)/(24 * 60 * 60 * 1000) + 1).toFixed(0);
}

// getTimeInFormat
function GTIF(t) {
  const dt = new Date(t);
  // console.log(dt, t);
  const MonArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const time = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
  // const time = `${dt.getDate()}-${MonArr[dt.getMonth()]}-${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;
  return time;
}

function getAMPM(hours) {
  if (hours >= 12) return 'PM';
  return 'AM';
}

function getGanttDate(date) {
  const dt = new Date(date);
  const ganttDt = `${getInDig(dt.getDate(), 2)}-${getInDig(dt.getMonth() + 1, 2)}-${dt.getFullYear()}`;
  // console.log(ganttDt);
  return ganttDt;
}

function getInDig(val, i) {
  if (i == 2 && val < 10) return `0${val}`;
  if (i == 2 && val >= 10) return val;
  if (i == 3 && val < 100 && val < 10) return `00${val}`;
  if (i == 3 && val < 100 && val > 10) return `0${val}`;
  if (i == 3 && val >= 100) return val;
}

function changeDataView(t) {
  dataView = t;
  if (t == 'table') {
    $("#table-toggle").addClass('active');
    $("#gantt-toggle").removeClass('active');
    $("#gant-test-data-table").css('display', 'block');
    $("#gantt-view-block").css('display', 'none');
  }
  if (t == 'gantt') {
    $("#table-toggle").removeClass('active');
    $("#gantt-toggle").addClass('active');
    $("#gantt-view-block").css('display', 'block');
    $("#gant-test-data-table").css('display', 'none');
    setGanttBoxHeight();
    renderGantt();
  }
}

function setGanttBoxHeight() {
  const minHeight = ((25 * testData.length) + 89) + 'px';
  console.log(minHeight);
  $("#gantt_here").css('min-height', minHeight);
}

function renderGantt() {
  ganttDataArr = [];
  for (let i in testData) {
    const ganttObj = formatToGanttObj(testData[i], i);
    console.log(ganttObj);
    ganttDataArr.push(ganttObj);
  }
  // console.log(JSON.stringify(ganttDataArr));
  var tasks = {
    data: [...ganttDataArr],
    links: []
  };

  gantt.config.columns = [
		{name: "id", label: "", tree: false, align: "center", max_width: 40, min_width: 40, resize: true},
		{name: "color", label: "", tree: false, align: "center", min_width: 30, max_width: 30, width: 30, resize: true, template: (e) => {
      return `
      <span style="width: 15px; height: 15px; border: 1px solid #9c9a9e; border-radius: 15px; background-color: ${e.color}; display: block; margin-top: 5px;"></span>`
    }},
		{name: "request_id", label: "View",  align: "center", tree: false, width: "*", resize: true, template: (obj) => {
      return `<a href="https://sunnetqa.anblicks.com/itoa/outage/view.htmlx?editedOutage.appId=${obj.request_id}" target="_blank">view</a>`;
    }},
		{name: "text", label: "Name",  align: "left", tree: false, max_width: 250, width: 250, min_width: 250, resize: true},
		{name: "start_date", label: "Start", align: "left", resize: true, template: (e) => { return `${GTIF(e.start_date)}`}},
		{name: "end_date", label: "End", align: "left", resize: true, template: (e) => { return `${GTIF(e.end_date)}`}},
		{name: "duration", label: "Duration", align: "center", template: (obj) => {
      return getDur(obj.start_date, obj.end_date);
    }}
  ];
  
  var today = new Date();
  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);

	gantt.addMarker({
		start_date: today,
		css: "today",
		text: "Today",
		title: "Today: " + date_to_str(today)
	});
  
  gantt.ext.zoom.init(zoomConfig);
  gantt.ext.zoom.setLevel("month");
  gantt.config.task_height = 22.5;
  gantt.config.row_height = 25;
  gantt.init("gantt_here");
  gantt.parse(tasks);
  // zoomToFit();
}

// {request_id: 6927, request_name: "5X NEW SOUTH ROAD test", start_date: "2019-09-10",end_date: "2019-12-09"},

function formatToGanttObj(data, i) {
  const obj = {
    id: Number(Number(i) + 1),
    text: data.request_name,
    start_date: getGanttDate(data.start_date),
    end_date: getGanttDate(data.end_date),
    duration: getDur(data.start_date, data.end_date),
    request_id: data.request_id,
    color: data.color,
    textColor: data.textColor
  };
  if (theme == 'default') {
    obj.color = null,
    obj.textColor = null
  }
  return obj;
}

function zoomIn() {
  gantt.ext.zoom.zoomIn();
}

function zoomOut() {
  gantt.ext.zoom.zoomOut()
}

// {request_id: 6731, request_name: "19-00582 WATTERSON WT-69KV TR 1", start_date: "2019-09-11",end_date: "2019-09-12","color":"#ff9800", textColor: "#ffffff"}

function addTask() {
  var service_id, service_cdt, service_sdt, service_dur, service_com;
  if (!gev('request_name') || !gev('start_date') || !gev('end_date')) return alert('Invalid form data.');
  const Obj = {
    request_name: gev('request_name'),
    request_id: gev('request_id'),
    start_date: new Date(gev('start_date')),
    end_date: new Date(gev('end_date')),
    duration: getDur(start_date, end_date)
  };
  testData.push(Obj);
  resetForm()
  if (dataView == 'table') return renderTableData();
  else {
    setGanttBoxHeight();
    renderGantt();
  }
}

function resetForm() {
  const inputs = ['request_name', 'request_id', 'start_date', 'end_date', 'request_dur'];
  inputs.forEach(e => gei(e).value = null);
}

function gei(id) {
  return document.getElementById(id);
}

function gev(id) {
  return document.getElementById(id).value;
}

function changeSkin(skin) {
  // document.getElementById('skin_link').
  var link = document.createElement("link");
  // theme = 'default';
  link.onload = function () {
    gantt.resetSkin();
    gantt.render();
  };

  link.rel = "stylesheet";
  link.type = "text/css";
  link.id = "skin";
  link.href = "/gantt-codebase/codebase/skins/dhtmlxgantt_" + skin + ".css";
  document.head.replaceChild(link, document.querySelector("#skin"));
}

// Function to execute on date change
function onDateChange() {
  const st = gev('start_date');
  const end = gev('end_date');
  // console.log(st, end, 'setting date');
  if (st && end) {
    // console.log(st, end, 'setting date');
    document.getElementById('request_dur').value = getDur(st, end);
  }
}

function setColors(val) {
  theme = val;
  renderGantt();
}

function exportToExcel() {
  gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
      { id:"text",  header:"Title", width:150 },
      { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    visual:true,
    cellColors:true
  });
}

function exportToPdf() {
  gantt.exportToPDF();
}

function exportToPNG() {
  gantt.exportToPNG();
}