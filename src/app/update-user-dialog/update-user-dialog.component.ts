import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Create a copy of the user data to avoid modifying the original object
    this.user = { ...data.user };
  }

  onSave() {
    this.dialogRef.close(this.user);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
