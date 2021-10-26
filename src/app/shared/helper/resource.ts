import { Injectable } from '@angular/core';

//@Injectable()
export class Resources {
  public static get icon_success(): string { return 'success'; }
  public static get icon_warning(): string { return 'warning'; }
  public static get icon_info(): string { return 'info'; }
  public static get icon_error(): string { return 'error'; }
  public static get loading(): string { return 'درحال دریافت اطلاعات ...'; }
  public static get errorGetData(): string { return 'خطا در دریافت اطلاعات'; }
  public static get errorPostData(): string { return 'خطا در ثبت یا ویرایش اطلاعات'; }
  public static get success(): string { return 'ثبت موفق داده'; }
  public static get error(): string { return 'خطا در ثبت !'; }
  public static get errorCount(): string { return ' تعداد ورودی  نباید از موجودی بیشتر باشد  !'; }
  public static get successDelete(): string { return 'حذف با موفقیت انجام شد'; }
  public static get acceptPlace(): string { return 'تایید مکان فعلی با موفقیت انجام شد'; }
  public static get successUpload(): string { return 'فایل با موفقیت آپلود شد'; }
  public static get successRemoveFile(): string { return 'فایل با موفقیت حذف شد'; }
  public static get errorSavedata(): string { return 'خطا در ثبت اطلاعات !'; }
  public static get errorDeletedata(): string { return 'خطا در حذف اطلاعات !'; }
  public static get errorDeletefactor(): string { return ' به دلیل وجود فاکتور قابل حذف نمیباشد!'; }
  public static get errorDeletefactoritem(): string { return 'این سبد دارای محصول می باشد آیا مایل به حذف می باشید!!!'; }
  public static get errorDeletedataItem(): string { return ' حذف رکورد با مشکل مواجه شده است !'; }
  public static get errorChildDeletedataItem(): string { return ' به دلیل وجود وابستگی این رکورد قابل حذف نمی باشد !'; }
  public static get errorDataEntry(): string { return 'داده های ورودی را بررسی کنید !'; }
  public static get errorRenovationCodeDuplicated(): string { return 'کد نوسازی وارد شده قبلا ثبت شده است!'; }
  public static get errorLogin(): string { return 'کاربری با این اطلاعات موجود نیست !'; }
  public static get errorInEntiredata(): string { return 'خطا در اطلاعات وارد شده !'; }
  public static get qu_SaveData(): string { return 'آیا اطلاعات ثبت گردد ؟'; }
  public static get qu_DeleteData(): string { return 'آیا برای حذف اطمینان دارید ؟'; }
  public static get qu_insertData(): string { return 'این ویژگی قبلا ثبت شده است'; }
  public static get successDeleteItem(): string { return 'حذف آیتم انتخابی با موفقیت انجام شد'; }
  public static get successTitle(): string { return ' موفق '; }
  public static get errorTitle(): string { return 'خطا !'; } 
  public static get warningTitle(): string { return ' توجه '; }
  public static get yes(): string { return ' بله '; }
  public static get no(): string { return ' خیر '; }
  public static get ok(): string { return ' تایید '; }
  public static get cancel(): string { return ' انصراف '; }
  public static get successLogin(): string { return ' شما با موفقیت لاگین شدید '; }
  //#region GridFilterMessage

  public static get eq(): string { return ' برابر با '; }
  public static get neq(): string { return 'نا مساوی با '}
  public static get contains(): string { return ' شامل '}
  public static get doesnotcontain(): string { return ' شامل نیست '}
  public static get startswith(): string { return ' شروع با '}
  public static get endswith(): string { return ' خاتمه با '}
  public static get isnull(): string { return ' تهی '}
  public static get isnotnull(): string { return ' تهی نیست '}
  public static get isempty(): string { return ' خالی '}
  public static get isnotempty(): string { return ' خالی نیست '}

  public static get notfilter(): string { return ' بدون فیلتر '}

  //#endregion GridFilterMessage

  // 200 * 1024 = 200KB
  public static get FileUploadSizeLimit(): number { return 200 * 1024; }
}
