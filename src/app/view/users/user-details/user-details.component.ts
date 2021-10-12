import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user?: User;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
