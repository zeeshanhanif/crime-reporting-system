export default class ReportActions {

    static FILE_REPORT = 'FILE_REPORT';
    static FILE_REPORT_SUCCESSFUL = 'FILE_REPORT_SUCCESSFUL';
    static FILE_REPORT_REJECTED = 'FILE_REPORT_REJECTED';

    static GET_REPORT_LIST = 'GET_REPORT_LIST';
    static GET_REPORT_LIST_SUCCESSFUL = 'GET_REPORT_LIST_SUCCESSFUL';
    static GET_REPORT_LIST_REJECTED = 'GET_REPORT_LIST_REJECTED';

    static ADD_REPORT_ITEM = 'ADD_REPORT_ITEM';

    static GET_REPORT_DETAIL = 'GET_REPORT_DETAIL';
    static GET_REPORT_DETAIL_SUCCESSFUL = 'GET_REPORT_DETAIL_SUCCESSFUL';
    static GET_REPORT_DETAIL_REJECTED = 'GET_REPORT_DETAIL_REJECTED';

    static GET_LIST_OF_CITIES = 'GET_LIST_OF_CITIES';
    static GET_LIST_OF_CITIES_SUCCESSFUL = 'GET_LIST_OF_CITIES_SUCCESSFUL';
    static GET_LIST_OF_CITIES_REJECTED = 'GET_LIST_OF_CITIES_REJECTED';

    static GET_REPORT_COUNTS = 'GET_REPORT_COUNTS';
    static GET_REPORT_COUNTS_SUCCESSFUL = 'GET_REPORT_COUNTS_SUCCESSFUL';
    static GET_REPORT_COUNTS_REJECTED = 'GET_REPORT_COUNTS_REJECTED';


    static GET_MY_REPORT_LIST = 'GET_MY_REPORT_LIST';
    static GET_MY_REPORT_LIST_SUCCESSFUL = 'GET_MY_REPORT_LIST_SUCCESSFUL';
    static GET_MY_REPORT_LIST_REJECTED = 'GET_MY_REPORT_LIST_REJECTED';

    static ADD_MY_REPORT_ITEM = 'ADD_MY_REPORT_ITEM';


    static UPDATE_REPORT_STATUS = 'UPDATE_REPORT_STATUS';
    static UPDATE_REPORT_STATUS_SUCCESSFUL = 'UPDATE_REPORT_STATUS_SUCCESSFUL';
    static UPDATE_REPORT_STATUS_REJECTED = 'UPDATE_REPORT_STATUS_REJECTED';

    static fileReport() {
        return {
            type: ReportActions.FILE_REPORT
        }
    }

    static fileReportSuccessful() {
        return {
            type: ReportActions.FILE_REPORT_SUCCESSFUL
        }
    }

    static fileReportRejected(error) {
        return {
            type: ReportActions.FILE_REPORT_REJECTED,
            payload: error
        }
    }    


    static getReportList() {
        return {
            type: ReportActions.GET_REPORT_LIST
        }
    }

    static getReportListSuccessful(reportList) {
        return {
            type: ReportActions.GET_REPORT_LIST_SUCCESSFUL,
            payload: reportList
        }
    }

    static addReportToList(reportObj) {
        return {
            type: ReportActions.ADD_REPORT_ITEM,
            payload: reportObj
        }
    }

    static getReportDetail() {
        return {
            type: ReportActions.GET_REPORT_DETAIL
        }
    }

    static getReportDetailSuccessful(reportObj) {
        return {
            type: ReportActions.GET_REPORT_DETAIL_SUCCESSFUL,
            payload: reportObj
        }
    }

    static getReportDetailRejected(error) {
        return {
            type: ReportActions.GET_REPORT_LIST_REJECTED,
            payload: error
        }
    }  


    static getListOfCities() {
        return {
            type: ReportActions.GET_LIST_OF_CITIES
        }
    }

    static getListOfCitiesSuccessful(listOfCities) {
        return {
            type: ReportActions.GET_LIST_OF_CITIES_SUCCESSFUL,
            payload: listOfCities
        }
    }

    static getListOfCitiesRejected(error) {
        return {
            type: ReportActions.GET_LIST_OF_CITIES_REJECTED,
            payload: error
        }
    }


    static getReportCounts() {
        return {
            type: ReportActions.GET_REPORT_COUNTS
        }
    }

    static getReportCountsSuccessful(reportCounts) {
        return {
            type: ReportActions.GET_REPORT_COUNTS_SUCCESSFUL,
            payload: reportCounts
        }
    }

    static getReportCountsRejected(error) {
        return {
            type: ReportActions.GET_REPORT_COUNTS_REJECTED,
            payload: error
        }
    }


    static getMyReportList() {
        return {
            type: ReportActions.GET_MY_REPORT_LIST
        }
    }

    static getMyReportListSuccessful(reportList) {
        return {
            type: ReportActions.GET_MY_REPORT_LIST_SUCCESSFUL,
            payload: reportList
        }
    }

    static addMyReportToList(reportObj) {
        return {
            type: ReportActions.ADD_MY_REPORT_ITEM,
            payload: reportObj
        }
    }



    static updateReportStatus() {
        return {
            type: ReportActions.UPDATE_REPORT_STATUS
        }
    }

    static updateReportStatusSuccessful() {
        return {
            type: ReportActions.UPDATE_REPORT_STATUS_SUCCESSFUL
        }
    }

    static updateReportStatusRejected(error) {
        return {
            type: ReportActions.UPDATE_REPORT_STATUS_REJECTED,
            payload: error
        }
    }    
}