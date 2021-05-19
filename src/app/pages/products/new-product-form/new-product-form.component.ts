import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductDetailsDTO, ProductCategory, TextDesciption, ProductMfg, PriceOption } from './../../../@core/Models/DTO/ProductDetailsDTO';
import { HTTPService } from './../../../@core/Services/HTTP/HTTPService';
import { NbToastrService } from '@nebular/theme';

@Component({
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {

  productDetails? : ProductDetailsDTO;

  modelCode: string = "";
  productType: string = "";
  lifecycle?: boolean = false;
  obsolete?: boolean = false;
  useInCompounds: boolean = false;
  weight?: any = "";
  valueShort: string = "";
  valueLong?: string= "";
  transferPrice: number = null;
  listPrice: number = null;
  heightMm?: any = "";
  widthMm?: any = "";
  powerUsageW?: any = "";
  heatGenerationW?: any = "";
  idPlatform: number = null;
  idCategory: number = null;
  marketGroup: string = "";
  mfgCurrency: string = "";
  countryOfOrigin: string = "";
  deliveryCode: string = "";
  priceSubtab: number;
  maxQty: number;

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private httpServices: HTTPService, private toastrService: NbToastrService) {
    this.productDetails = new ProductDetailsDTO();

  }

  ngOnInit(): void {
  }
  AddProduct(position, status){

    this.productDetails.deviceType.idDeviceType = 10021
    this.productDetails.productMfgs[0].idMfg = 17

    this.httpServices.Post("https://localhost:44375/api/Definitions/addproduct",null,this.productDetails).subscribe(res =>
    {
      debugger
      console.log(res)
        this.toastrService.show(
          status || 'Success',
          `Product addition`,
          { position, status });
    })


  }

}
