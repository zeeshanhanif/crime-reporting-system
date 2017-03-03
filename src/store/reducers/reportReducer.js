import ReportActions from "./../actions/reportActions";

const INITIAL_STATE = {
    //authUser: {},
    isProcessing : false,
    isError : false,
    errorMessage: {},
    reportList: [],
    reportDetail : {},
    isReportSubmited: false,
    cityList: [],
    reportCounts:{},
    myReportList:[]
    /*
    reportCounts:{
        totalCounts: {
            complaints:34,
            crimes: 12,
            missingPersons: 34,
        },
        karachi:{
            complaints:34,
            crimes: 12,
            missingPersons: 34,
        }
    }
    */
}

function ReportReducer(state = INITIAL_STATE, action) {
    switch(action.type) {        
        case ReportActions.FILE_REPORT:
            return {...state, isProcessing: true, isError : false,isReportSubmited:false};
        case ReportActions.FILE_REPORT_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isReportSubmited:true};            
        case ReportActions.FILE_REPORT_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isReportSubmited:false};         
        case ReportActions.GET_REPORT_LIST:
            return {...state, isProcessing: true, isError : false,reportList:[]};
        case ReportActions.GET_REPORT_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, reportList:action.payload};
        case ReportActions.ADD_REPORT_ITEM:
            var newReportList = [...state.reportList];
            newReportList.push(action.payload);
            return {...state, isProcessing: false, isError : false, reportList:newReportList};
        
        case ReportActions.GET_REPORT_DETAIL:
            return {...state, isProcessing: true, isError : false, reportDetail: {}};
        case ReportActions.GET_REPORT_DETAIL_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},reportDetail:action.payload};            
        case ReportActions.GET_REPORT_DETAIL_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, reportDetail:{}};
        
        case ReportActions.GET_LIST_OF_CITIES:
            return {...state, isProcessing: true, isError : false, cityList: []};
        case ReportActions.GET_LIST_OF_CITIES_SUCCESSFUL:            
            return {...state, isProcessing: false ,isError : false, errorMessage: {},cityList:action.payload};            
        case ReportActions.GET_LIST_OF_CITIES_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, cityList:[]};

        case ReportActions.GET_REPORT_COUNTS:
            return {...state, isProcessing: true, isError : false, reportCounts: {}};
        case ReportActions.GET_REPORT_COUNTS_SUCCESSFUL:            
            return {...state, isProcessing: false ,isError : false, errorMessage: {},reportCounts:action.payload};            
        case ReportActions.GET_REPORT_COUNTS_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, reportCounts:{}};            


        case ReportActions.GET_MY_REPORT_LIST:
            return {...state, isProcessing: true, isError : false,myReportList:[]};
        case ReportActions.GET_MY_REPORT_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, myReportList:action.payload};
        case ReportActions.ADD_MY_REPORT_ITEM:
            var newReportList = [...state.myReportList];
            newReportList.push(action.payload);
            return {...state, isProcessing: false, isError : false, myReportList:newReportList};            

        case ReportActions.UPDATE_REPORT_STATUS:
            return {...state, isProcessing: true, isError : false,isStatusUpdated:false};
        case ReportActions.UPDATE_REPORT_STATUS_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isStatusUpdated:true};            
        case ReportActions.UPDATE_REPORT_STATUS_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isStatusUpdated:false};                     
        default:
            return state;
    }
}

export default ReportReducer;