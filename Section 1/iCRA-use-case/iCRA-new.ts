
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

export class RecordQAComponent implements OnInit {
  frameworkComponents: any = {
    buttonRenderer: LinkRendererComponent,
  };
  columnDefs: any[0];
  RecordQADataList = [];
  RecordQAFilteredDataList = [];
  TotalRecordQAData = 0;

  constructor(public RecordQAService: RecordQaService, public toastr: ToastrService, public router: Router
    , private EncrDecr: EncrDecrServiceService, public ChartRetrivalService: ChartRetrivalService) {
  }

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

    this.SC_BindUnresolvedRecordQAGrid();
  }

  /**
   * validate and redirect
   * @param param0 File detials
   */
  async ValidateAndRedirect({ rowData }) {
    try {
      let AllocatedFile = await this.ChartRetrivalService.CheckAndAllocateIncomigFileInProcessPromise({
        'UserID': Number(this.EncrDecr.get_Userid()),
        'IncomingFileId': rowData.IncomingFileId,
        'ActionBy': 'R',
        'FileName': rowData.FileName
      });

      if (!AllocatedFile.IsSuccess) throw (AllocatedFile.Message[0].Message);
      if (AllocatedFile.Data !== 'Successfully allocated') throw (AllocatedFile.Data);
      
      this.router.navigate(['/record-qa-details', rowData.IncomingFileId, rowData.FileName, rowData.RetrievalMethod]);

    } catch (error) {
      this.toastr.error(error.toString(), 'Error', { timeOut: 5000 });
    }
  }

  /**
   * Bind Unresolve RecorsQA Grid
   */
  async SC_BindUnresolvedRecordQAGrid() {
    try {
      let RecordQAData = await this.RecordQAService.GetRecordQAQueueDataPromise({ 'UserID': Number(this.EncrDecr.get_Userid()) })
      if (!RecordQAData.IsSuccess) throw (RecordQAData.Message[0].Message)

      this.RecordQADataList = RecordQAData.Data[0];
      this.TotalRecordQAData = this.RecordQADataList.length;

      sessionStorage.setItem('FilePathConfiguration', this.EncrDecr.GetEncryption(RecordQAData.Data[1]));
      sessionStorage.setItem('ReasonSegement', this.EncrDecr.GetEncryption(RecordQAData.Data[2]));
    } catch (error) {
      this.toastr.error(error.toString(), 'Error', { timeOut: 5000 });
    }
  }
}

