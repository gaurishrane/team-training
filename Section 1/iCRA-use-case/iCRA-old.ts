import { Component, OnInit } from '@angular/core';
import { EncrDecrServiceService } from 'src/app/Shared/encr-decr-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RecordQaService } from 'Service/Chart Retrival/record-qa.service';
import { ChartRetrivalService } from 'Service/Chart Retrival/chart-retrival.service';
import { LinkRendererComponent } from 'src/app/Shared/link-renderer.component';

@Component({
    selector: 'app-record-qa',
    templateUrl: './record-qa.component.html',
    styleUrls: ['./record-qa.component.css']
})
// RecordQAComponent

export class RecordQAComponent implements OnInit {

    constructor(public RecordQAService: RecordQaService, public toastr: ToastrService, public router: Router
        , private EncrDecr: EncrDecrServiceService, public ChartRetrivalService: ChartRetrivalService) {
        this.frameworkComponents = {
            buttonRenderer: LinkRendererComponent,
        }
    }
    frameworkComponents: any;
    columnDefs: any[0];

    RecordQADataList = [];
    RecordQAFilteredDataList = [];
    TotalRecordQAData = 0;


    ngOnInit() {
        this.columnDefs = [
            { headerName: 'Retrieval Method', field: 'RetrievalMethod', sortable: true, filter: true, width: 150, resizable: true },
            { headerName: 'Date Recieved', field: 'DateReceived', sortable: true, filter: true, width: 150, resizable: true },
            {
                headerName: 'ChaseId',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                    onClick: this.ValidateAndRedirect.bind(this),
                    label: this,
                    colName: 'ChaseId'
                }
                , width: 100, resizable: true
                , sortable: true, filter: true
            },
            {
                headerName: 'Member Name', field: 'MemberName', sortable: true, filter: true
                , width: 100, resizable: true
            },
            { headerName: 'Member DOB', field: 'MemberDOB', sortable: true, filter: true, width: 120, resizable: true },
            { headerName: 'Number of Pages ', field: 'NumberOfPages', sortable: true, filter: true, width: 150, resizable: true },
            {
                headerName: 'Project Name', field: 'ProjectName', sortable: true, filter: true
                , width: 100, resizable: true
            },
            {
                headerName: 'Project Type', field: 'ProjectType', sortable: true, filter: true
                , width: 100, resizable: true
            },
            {
                headerName: 'Chase Type', field: 'ChaseType', sortable: true, filter: true
                , width: 100, resizable: true
            },
        ];

        this.BindUnresolvedRecordQAGrid();
    }

    BindUnresolvedRecordQAGrid() {
        this.SC_BindUnresolvedRecordQAGrid();
    }

    ValidateAndRedirect(event) {
        var data = event.rowData;
        var IncomigFileInProcessRequestDTO = {
            'UserID': Number(this.EncrDecr.get_Userid())
            , 'IncomingFileId': data.IncomingFileId, 'ActionBy': 'R'
            , 'FileName': data.FileName
        };
        console.log(IncomigFileInProcessRequestDTO);
        this.ChartRetrivalService.CheckAndAllocateIncomigFileInProcess(IncomigFileInProcessRequestDTO)
            .subscribe((response: any) => {
                if (response.length == 0) {
                    this.toastr.error('Some Error Occured', 'Error', {
                        timeOut: 3000
                    });
                } else {
                    if (response.IsSuccess) {
                        if (response.Data == "Successfully allocated") {
                            this.router.navigate(['/record-qa-details', data.IncomingFileId, data.FileName, data.RetrievalMethod]);
                        }
                        else {
                            this.toastr.error(response.Data, 'Error', {
                                timeOut: 3000
                            });
                        }
                    }
                    else {
                        this.toastr.error(response.messages[0].messages, 'Error', {
                            timeOut: 3000
                        });
                    }
                }
            },
                (error) => {
                    this.toastr.error(error.messages, 'Error', {
                        timeOut: 3000
                    });
                })
    }


    SC_BindUnresolvedRecordQAGrid() {
        var CommonInputDTO = { 'UserID': Number(this.EncrDecr.get_Userid()) };
        this.RecordQAService.GetRecordQAQueueData(CommonInputDTO).subscribe((response: any) => {
            if (response.length == 0) {
                this.toastr.error('Some Error Occured', 'Error', {
                    timeOut: 3000
                });
            }
            else {
                if (response.IsSuccess) {

                    this.RecordQADataList = response.Data[0];
                    console.log(this.RecordQADataList);
                    this.TotalRecordQAData = this.RecordQADataList.length;

                    var FilePathConfiguration = this.EncrDecr.GetEncryption(response.Data[1]);
                    sessionStorage.setItem('FilePathConfiguration', FilePathConfiguration);

                    var ReasonSegement = this.EncrDecr.GetEncryption(response.Data[2]);
                    sessionStorage.setItem('ReasonSegement', ReasonSegement);
                }
                else {
                    this.toastr.error(response.Messages[0].Message, 'Error', {
                        timeOut: 5000
                    });
                }
            }

        }, (error) => {
            this.toastr.error("Some Error Occured" + error.messages, 'Error', {
                timeOut: 5000
            });
        })
    }
}
