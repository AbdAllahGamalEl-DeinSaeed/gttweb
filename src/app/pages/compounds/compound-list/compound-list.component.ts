import { CompoundMemberInsertions, CompoundMembersTree } from './../../../@core/Models/DTO/CompoundMemberAssignmentDTO';
import { CompoundDetailsDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO';
import { Compounds_CompoundHierarchyDTO, CompoundMembers_CompoundHierarchyDTO, Products_CompoundHierarchyDTO, CompoundMemberItems_CompoundHierarchyDTO } from './../../../@core/Models/DTO/CompoundHierarchyDTO';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbButton, NbToastrService, NbLayoutDirection } from '@nebular/theme';
import { Router } from '@angular/router';
import { MatDialog } from'@angular/material/dialog'
import {CompoundMemberAdditionModalComponent } from '../compound-member-addition-modal/compound-member-addition-modal.component'
import { StringifyOptions } from 'querystring';
import { FsIconCompoundMembersAssignmentComponent } from '../compound-members-assignment/compound-members-assignment.component';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Injectable()
export class ProductListService {
  productsList : Products_CompoundHierarchyDTO[];

  AssignProductList(responseList : Products_CompoundHierarchyDTO[])
  {
    this.productsList = responseList;
  }
}

@Injectable()
export class CompoundListService {

  newCompoundMemberName: string;
  customColumn = 'name';
  defaultColumns = ['idCompoundMember'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CompoundMembers_CompoundHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  compoundId : any;
  isCompoundMemberTreeEditable : boolean;
  compoundMemberListData: CompoundMembers_CompoundHierarchyDTO[];
  compoundMembersApi: CompoundMembers_CompoundHierarchyDTO[];
  compoundMemberNames : string[];
  compoundMembersTree : CompoundMembersTree;
  private data: TreeNode<CompoundMembers_CompoundHierarchyDTO>[] ;
    public CompoundMembers: CompoundMembers_CompoundHierarchyDTO[] = [];

  constructor(private route: ActivatedRoute,
    private httpServices: HTTPService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundMembers_CompoundHierarchyDTO>)
    {
    }

    ngOnInit(): void {
    }

  GetCompoundMembersFromApi(id)
  {
    const request = 'https://localhost:44375/api/Definitions/getcompoundmembers_compoundhierarchy';
    this.httpServices.Get(request, {compoundId : id}).subscribe((CompoundMembers:  CompoundMembers_CompoundHierarchyDTO[]) =>
    {
      this.compoundMembersApi = CompoundMembers;
      this.PrepareCompoundMembers(this.compoundMembersApi);
    });
  }

  InitializeCompoundMemberTree()
  {
    this.compoundMembersTree = new CompoundMembersTree();
    this.compoundMembersTree.compoundMemberInsertions = [];
    this.compoundMembersTree.compoundMemberRemovals = [];
  }

  GetCompoundMemberNames(compoundId : number)
  {
    const request = 'https://localhost:44375/api/Definitions/getcompoundmembernames';
    this.httpServices.Get(request, {compoundId : compoundId}).subscribe((CompoundMemberNames:  string[]) =>
    {
      this.compoundMemberNames = CompoundMemberNames;
    });
  }

  PrepareCompoundMembers(CompoundMembersData : CompoundMembers_CompoundHierarchyDTO[])
  {
    console.log("id = ", CompoundMembersData);
    this.GetCompoundMembers(CompoundMembersData,()=>{
      // debugger;
     this.dataSource=this.dataSourceBuilder.create(this.data);
     console.log(this.dataSource, "success");
    }, this.compoundId)
  }

  GetCompoundMembers(CompoundMembersData, callbackFun, id)
  {
    console.log("called")
     this.compoundMemberListData = CompoundMembersData;
     console.log("compound members", this.compoundMemberListData)
     this.data = this.MapData(CompoundMembersData);
     console.log("data",this.data);
     console.log(this.defaultColumns)
     callbackFun();
     return this.data ;
  }

  MapData(res){
    let  mappedData=[];
    res.forEach(element => {
      mappedData.push(this.mapObj(element))
    });
    return mappedData ;
  }

  mapObj(_obj){
    let x={ data: { name:"",idCompoundMember:""},children:[]}
     x=this.mapObjData(_obj);

     x.children= _obj.compoundMembersChildren?.map(a=>this.mapObjData(a) )
     console.log(x);
     return x
   }

   mapObjData(_obj){
    let x={ data: { name:"",idCompoundMember:""},children:[]}
    x.data.name= _obj.name
    x.data.idCompoundMember=_obj.idCompoundMember;
    // debugger;
     if(_obj.compoundMembersChildren?.length > 0 ){   x.children= _obj.compoundMembersChildren?.map(a=>this.mapObj(a) ) ;}
    return x;
   }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  GetData(r){
    console.log(r);
  return r
  }

}

@Component({
  selector: 'ngx-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.scss']
})
export class CompoundListComponent implements OnInit {

  categoryid: any;
  compoundId: number;
  compoundsList: Compounds_CompoundHierarchyDTO[];
  compoundDetails? : CompoundDetailsDTO;
  customColumn = 'name';
  defaultColumns = ['idCompoundMember'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CompoundMembers_CompoundHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  isCompoundEditable: boolean;
  newCompoundMemberName : string;

  public CompoundMembers: CompoundMembers_CompoundHierarchyDTO[] = [];
  private data: TreeNode<CompoundMembers_CompoundHierarchyDTO>[] ;

  constructor(private route: ActivatedRoute,
      private httpServices: HTTPService,
      private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundMembers_CompoundHierarchyDTO>,
      public productListService :ProductListService,
      private toasterService: NbToastrService,
      private router :Router,
      public compoundListService: CompoundListService,
      public dialog: MatDialog)
  {

  }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.queryParamMap.get('Catogeryid');
    this.GetCompoundList(this.categoryid)  ;
    this.compoundId = 320;
    this.isCompoundEditable = false;
  }

  GetCompoundList(id: any )
  {
    console.log(id);
    const request = 'https://localhost:44375/api/Definitions/getcompounds_compoundhierarchy';
    this.httpServices.Get(request ,{compoundCategoryId: id}).subscribe((response: Compounds_CompoundHierarchyDTO[]) =>
    {
      this.compoundsList = response ;
      console.log(this.compoundsList);
    });
  }

  GetCompound(id: number )
    {
      const request = 'https://localhost:44375/api/Definitions/getcompound';
      this.httpServices.Get(request , {compoundId: id}).subscribe((response :CompoundDetailsDTO)=>
      {
        this.compoundDetails = response;
      });
      this.compoundListService.compoundId = id;
      this.compoundListService.compoundMembersApi = [new CompoundMembers_CompoundHierarchyDTO()];
      this.compoundListService.GetCompoundMembersFromApi(id);
      this.compoundListService.isCompoundMemberTreeEditable = false;
      this.isCompoundEditable = false;
    }


  EditCompound()
  {
    this.isCompoundEditable = true;

  }

  CancelCompoundUpdate()
  {
    this.isCompoundEditable = false;
    this.GetCompound(this.compoundId);
  }

  SaveCompoundUpdate(position, status)
  {
    this.httpServices.Post("https://localhost:44375/api/Definitions/updatecompound",null,this.compoundDetails).subscribe(res =>
    {
      console.log(res)
        this.toasterService.show(
          status || 'Update success',
          `Compound has been updated succesfully`,
          { position, status });
      this.isCompoundEditable = false;
    })
  }

  EditCompoundMembersTree()
  {
    this.compoundListService.isCompoundMemberTreeEditable = true;
    this.compoundListService.GetCompoundMemberNames(this.compoundId);
    this.compoundListService.InitializeCompoundMemberTree();
  }

  CancelCompoundMembersTreeUpdate()
  {
    this.compoundListService.isCompoundMemberTreeEditable = false;
  }


}

@Component({
  selector: 'ngx-fs-icon-compound-list',
  template: `
   <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    <div *ngIf="this.compoundListService.isCompoundMemberTreeEditable == true">
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="primary"(click)="AddCompoundMemberWithParent()">Add child</button>
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="danger"(click)="RemoveCompoundMember()">Remove member</button>
    </div>
    <div *ngIf="this.compoundListService.isCompoundMemberTreeEditable == false">
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="info"(click)="GetProductList()">Assign products</button>
    </div>
    </ng-template>
    `,
})

export class FsIconCompoundListComponent {
 @Input() CategoryChildren;
 @Input() expanded: boolean;

 newCompoundMemberChild : any;
 isCompoundMemberEditable: boolean;
 nbButton: NbButton ;

 constructor
 (private httpServices: HTTPService,
  public compoundListService : CompoundListService,
   public productListService : ProductListService,
   private toasterService: NbToastrService,
   public dialog: MatDialog)
 {
 }

 isDir(): boolean
 {
   //debugger;
  return this.CategoryChildren.children !== undefined;
 }

 GetProductList(){
  console.log(this.CategoryChildren.data.idCompoundMember);
  const request = 'https://localhost:44375/api/Definitions/getproductsbycompoundmember_compoundhierarchy';
  this.httpServices.Get(request ,{compoundMemberId: this.CategoryChildren.data.idCompoundMember}).subscribe((response: Products_CompoundHierarchyDTO[]) =>
  {
    console.log(response);
    this.productListService.AssignProductList(response);
    console.log(this.productListService);
  });
}

CallEmptyCompoundMemberNameNotification(position, status){
  this.toasterService.show(
    status || 'Compound Member name empty',
    `Please provide a name for the Compound Member to be added to the tree`,
    { position, status });
 }

 CallAlreadyFoundCompoundMemberNameNotification(position, status)
 {
  this.toasterService.show(
    status || 'Compound Member name already found',
    `The name is already used in tree, please provide a unique name for each Member`,
    { position, status });
 }

 AddCompoundMemberWithParent()
 {
   const dialogRef = this.dialog.open(CompoundMemberAdditionModalComponent , { data: {newCompoundMemberName : this.compoundListService.newCompoundMemberName } });
   dialogRef.afterClosed().subscribe(result => {
    if(result == null || result == undefined)
    {
      this.CallEmptyCompoundMemberNameNotification('right','danger');
    }

    else if (this.compoundListService.compoundMemberNames.includes(result))
    {
      this.CallAlreadyFoundCompoundMemberNameNotification('right','danger');
    }

    else
    {
      this.compoundListService.compoundMemberNames.push(result);
      this.compoundListService.compoundMembersTree.compoundMemberInsertions.push(
        {
          idCompound : this.compoundListService.compoundId,
          name: result,
          parentName: this.CategoryChildren.data.name
        });
      console.log(" tree result", this.compoundListService.compoundMembersTree);
      this.AddCompoundMemberNode(this.CategoryChildren.data.name, result);
    }
   });
 }


 AddCompoundMemberNode(parentName: string, childName: string)
 {
   let newCompoundMemberChild = { name:childName,idCompoundMember:null,compoundMembersChildren: null};
   let isChildAdded = false;

   for(var i = 0; i < this.compoundListService.compoundMemberListData.length; i++)
   {
     console.log("result" ,this.compoundListService.compoundMemberListData[i]);
     if(this.compoundListService.compoundMemberListData[i].compoundMembersChildren != null)
     {
       for(var j = 0; j< this.compoundListService.compoundMemberListData[i].compoundMembersChildren.length; j++)
       {
         isChildAdded = this.FindChildeNodeForAddition(
           this.compoundListService.compoundMemberListData[i].compoundMembersChildren[j],
           parentName,
           childName,
           newCompoundMemberChild);
       }
     }
     else
     {
       if(this.compoundListService.compoundMemberListData[i].name == parentName)
       {
         if (this.compoundListService.compoundMemberListData[i].compoundMembersChildren == null)
         {
           this.compoundListService.compoundMemberListData[i].compoundMembersChildren = [];
         }
         this.compoundListService.compoundMemberListData[i].compoundMembersChildren.push(newCompoundMemberChild);
       }
     }
   }

   this.compoundListService.PrepareCompoundMembers(this.compoundListService.compoundMemberListData);
 }

 FindChildeNodeForAddition(compoundMember: CompoundMembers_CompoundHierarchyDTO, parentName: string, childName: string, newCompoundMemberChild: any)
 {
   if(compoundMember.name == parentName)
   {
     if (compoundMember.compoundMembersChildren == null)
     {
       compoundMember.compoundMembersChildren = [];
     }
     compoundMember.compoundMembersChildren.push(newCompoundMemberChild);
     return true;
   }

   else
   {
     if(compoundMember.compoundMembersChildren != null)
     {
       for(var i = 0; i< compoundMember.compoundMembersChildren.length; i++)
       {
         this.FindChildeNodeForAddition(compoundMember.compoundMembersChildren[i], parentName, childName, newCompoundMemberChild);
       }
     }
     return false;
   }

 }

 RemoveCompoundMember()
 {
  var index = this.compoundListService.compoundMemberNames.indexOf(this.CategoryChildren.data.name);
  this.compoundListService.compoundMemberNames.splice(index, 1);
  this.compoundListService.compoundMembersTree.compoundMemberRemovals.push(
    {
      name: this.CategoryChildren.data.name
    });
  console.log(" tree result", this.compoundListService.compoundMembersTree);
  this.RemoveCompoundMemberNode(this.CategoryChildren.data.name);
 }

 RemoveCompoundMemberNode(memberName: string)
 {
  var index;
   for(var i = 0; i < this.compoundListService.compoundMemberListData.length; i++)
   {
     if(this.compoundListService.compoundMemberListData[i].compoundMembersChildren != null)
     {
       if(this.compoundListService.compoundMemberListData[i].compoundMembersChildren.length != 0)
       {
        this.FindChildeNodeForRemoval(
          this.compoundListService.compoundMemberListData[i],
           memberName);
       }
     }
     else
     {
       if(this.compoundListService.compoundMemberListData[i].name == memberName)
       {
         if (this.compoundListService.compoundMemberListData[i].compoundMembersChildren == null)
         {
           this.compoundListService.compoundMemberListData[i].compoundMembersChildren = [];
         }
         index = this.compoundListService.compoundMemberListData.indexOf(this.compoundListService.compoundMemberListData[i]);
         this.compoundListService.compoundMemberListData.splice(index, 1);
       }
     }
   }
   console.log("removal result", this.compoundListService.compoundMemberListData);
   this.compoundListService.PrepareCompoundMembers(this.compoundListService.compoundMemberListData);
 }

 FindChildeNodeForRemoval(compoundMember: CompoundMembers_CompoundHierarchyDTO, memberName: string,)
 {

    if(compoundMember.compoundMembersChildren != null)
    {
      compoundMember.compoundMembersChildren = compoundMember.compoundMembersChildren.filter(child => child.name != memberName);
      for(var i = 0; i< compoundMember.compoundMembersChildren.length; i++)
      {
        this.FindChildeNodeForRemoval(compoundMember.compoundMembersChildren[i], memberName);
      }
    }
 }

}
