import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/postService.service';
import { Ipost } from '../../model/Ipost';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { _MatSnackBarBase } from '@angular/material/snack-bar';
import { SnackBarService } from '../../service/snackBar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  getAllPosts!: Ipost[];

  constructor(
    private _postService: PostService,
    private _matDialog: MatDialog,
    private _snackbar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._postService.fetchAll().subscribe({
      next: (data) => {
        this.getAllPosts = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEdit(editObj: Ipost) {
    this._postService.emitEditObj(editObj);
  }

  onRemove(removeId: number) {
    let config = new MatDialogConfig();
    ((config.width = '400px'), (config.disableClose = true));
    config.data = `Are you sure to remove the post  with id ${removeId}..?`;
    let matRef = this._matDialog.open(GetConfirmComponent, config);
    matRef.afterClosed().subscribe((getconfirm) => {
      if (getconfirm === true) {
        this._postService.onRemove(removeId).subscribe({
          next: (data) => {
            this._snackbar.openSnackBar(data.msg);
          },
          error: (err) => {
            this._snackbar.openSnackBar(err);
          },
        });
      }
    });
  }

  trackByFun(index : number , item : Ipost){
    return item.postId;
  }
}
