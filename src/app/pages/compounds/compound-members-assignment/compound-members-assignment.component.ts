import { CompoundMembers_CompoundHierarchyDTO, Products_CompoundHierarchyDTO } from './../../../@core/Models/DTO/CompoundHierarchyDTO';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { NbToastrService } from '@nebular/theme'
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,NbButton } from '@nebular/theme';
import { Router } from '@angular/router';
import { CompoundMembersDTO } from './../../../@core/Models/DTO/CompoundDetailsDTO';
import { MatDialog } from'@angular/material/dialog'
import {CompoundMemberAdditionModalComponent } from '../compound-member-addition-modal/compound-member-addition-modal.component'
import { CompoundMemberAssignmentDTO , ProductAssignmentInformation } from './../../../@core/Models/DTO/CompoundMemberAssignmentDTO';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Injectable()
export class AssignCompoundMembersService {


  compoundMemberAssignmentDTO : CompoundMemberAssignmentDTO;
  customColumn = 'name';
  defaultColumns = ['idCompoundMember'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CompoundMembers_CompoundHierarchyDTO>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  compoundId : any;
  private data: TreeNode<CompoundMembers_CompoundHierarchyDTO>[] ;
    public CompoundMembers: CompoundMembers_CompoundHierarchyDTO[] = [];

  constructor(private route: ActivatedRoute,
    private httpServices: HTTPService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundMembers_CompoundHierarchyDTO>)
    {
    }

    ngOnInit(): void {
    }

  PrepareCompoundMembers()
  {
    console.log("id = ", this.compoundId);
    this.GetCompoundMembers(()=>{
      // debugger;
     this.dataSource=this.dataSourceBuilder.create(this.data);
     console.log(this.dataSource, "success");
    }, this.compoundId)
  }

  GetCompoundMembers(callbackFun, id)
  {
    console.log("called")
    const request = 'https://localhost:44375/api/Definitions/getcompoundmembers_compoundhierarchy';
    this.httpServices.Get(request, {compoundId : id}).subscribe((CompoundMembers:  TreeNode<CompoundMembers_CompoundHierarchyDTO>[]) =>
    {
      this.data = this.MapData(CompoundMembers);
      console.log("data",this.data);
      console.log(this.defaultColumns)
      callbackFun();
     }) ;
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

  SaveAssignment(result){
    this.compoundMemberAssignmentDTO.productAssignmentInformation = result;
  }

}

@Component({
  selector: 'ngx-compound-members-assignment',
  templateUrl: './compound-members-assignment.component.html',
  styleUrls: ['./compound-members-assignment.component.scss']
})
export class CompoundMembersAssignmentComponent implements OnInit {

  compoundId: any;
  compoundMemberName: string;
  compoundMemberDetails: CompoundMembersDTO;



  constructor(private route: ActivatedRoute,
      private httpServices: HTTPService,
      private dataSourceBuilder: NbTreeGridDataSourceBuilder<CompoundMembers_CompoundHierarchyDTO>,
      private router :Router,
      public dialog: MatDialog,
      public assignCompoundMembersService: AssignCompoundMembersService,
      private toasterService: NbToastrService)
      {
        this.assignCompoundMembersService.compoundMemberAssignmentDTO = new CompoundMemberAssignmentDTO();
        this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation = [];
        this.compoundId = this.route.snapshot.queryParamMap.get('Compoundid');
        this.assignCompoundMembersService.compoundId = this.compoundId;
        this.assignCompoundMembersService.PrepareCompoundMembers();
        console.log("service data", this.assignCompoundMembersService.defaultColumns)
      }

  ngOnInit(): void {
  }


  AddCompoundMemberWithNoParent()
  {
    const dialogRef = this.dialog.open(CompoundMemberAdditionModalComponent , { data: {compoundId: this.compoundId, parentId: null } });
    dialogRef.afterClosed().subscribe(result => {
      this.assignCompoundMembersService.PrepareCompoundMembers();
    });
  }

  AssignProductsToCompoundMember(position, status)
  {

    console.log(this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation)
    this.httpServices.Post("https://localhost:44375/api/Definitions/assignproductstocompoundmember",null,this.assignCompoundMembersService.compoundMemberAssignmentDTO).subscribe(res =>
    {
      console.log(res)
        this.toasterService.show(
          status || 'Assignment success',
          `Products have been to the compound member successfully`,
          { position, status });
      this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation = [];
    })
  }



}

@Component({
  selector: 'ngx-fs-icon-compound-members-assignment',
  template: `
   <nb-tree-grid-row-toggle  *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="primary"(click)="AddCompoundMemberWithParent()">Add child</button>
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="danger"(click)="RemoveCompoundMember()">Remove member</button>
    <button nbButton style="margin-left: 10px;height: 30px; width: 170px;" status="info"(click)="GetProducts()">Assign products</button>
    </ng-template>
    `,
})

export class FsIconCompoundMembersAssignmentComponent {
  @Input() CategoryChildren;
  @Input() expanded: boolean;
  nbButton: NbButton ;

  productsByPlatform: Products_CompoundHierarchyDTO[] = [new Products_CompoundHierarchyDTO()];
  productsbyCompoundMember: Products_CompoundHierarchyDTO[] = [new Products_CompoundHierarchyDTO()];
  isAssigned : boolean;
  productIdsByCompoundMember: number[];
  newProduct : ProductAssignmentInformation;

  constructor(private httpServices: HTTPService, public dialog: MatDialog, public assignCompoundMembersService : AssignCompoundMembersService){  }

  isDir(): boolean
  {
    //debugger;
   return this.CategoryChildren.children !== undefined;
  }

  AddCompoundMemberWithParent()
  {
    const dialogRef = this.dialog.open(CompoundMemberAdditionModalComponent , { data: {compoundId: this.assignCompoundMembersService.compoundId, parentId: this.CategoryChildren.data.idCompoundMember } });
    dialogRef.afterClosed().subscribe(result => {
      this.assignCompoundMembersService.PrepareCompoundMembers();
    });
  }

  RemoveCompoundMember()
  {
    this.httpServices.Post("https://localhost:44375/api/Definitions/removecompoundmember",{compoundMemberId: this.CategoryChildren.data.idCompoundMember}).subscribe(res =>
    {
      this.assignCompoundMembersService.PrepareCompoundMembers();
    })
  }

  GetProducts(){
    const firstRequest = 'https://localhost:44375/api/Definitions/getproductsbycompoundmember_compoundhierarchy';
    this.httpServices.Get(firstRequest ,{compoundMemberId: this.CategoryChildren.data.idCompoundMember}).subscribe((response: Products_CompoundHierarchyDTO[]) =>
    {
      console.log(response);
      this.productsbyCompoundMember = response;
      this.GetCompoundMembersByPlatform();

    });
  }

  GetCompoundMembersByPlatform()
  {
    const secondRequest = 'https://localhost:44375/api/Definitions/getproductsbyplatform_compoundhierarchy';
    this.httpServices.Get(secondRequest ,{platformId: 1}).subscribe((response: Products_CompoundHierarchyDTO[]) =>
    {
      console.log(response);
      this.productsByPlatform = response;
      this.CreateProductAssignmentList();
    });
  }

  CreateProductAssignmentList()
  {
    this.productIdsByCompoundMember = new Array();

    if(this.productsbyCompoundMember.length != 0)
    {
      this.productsbyCompoundMember.forEach((product) =>
      {
        this.productIdsByCompoundMember.push(product.ProductId);
      });
    }
    console.log(this.productsByPlatform.length);

    this.assignCompoundMembersService.compoundMemberAssignmentDTO = new CompoundMemberAssignmentDTO();
    this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation = [];
    this.assignCompoundMembersService.compoundMemberAssignmentDTO.idCompoundMember = this.CategoryChildren.data.idCompoundMember;

    this.productsByPlatform.forEach((product : any) =>
    {
      if(this.productIdsByCompoundMember.includes(product.productId)){
        this.isAssigned = true
      }
      else{
        this.isAssigned = false;
      }

      this.newProduct = {
        ProductId : product.productId,
        ModelCode : product.modelCode,
        Name : product.name,
        IsAssigned : this.isAssigned
      }

      this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation.push(this.newProduct);
    });
    this.assignCompoundMembersService.SaveAssignment(this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation);
    console.log(this.assignCompoundMembersService.compoundMemberAssignmentDTO.productAssignmentInformation);

  }

 }

