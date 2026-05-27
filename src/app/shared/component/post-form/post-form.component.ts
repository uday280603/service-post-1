import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../service/postService.service';
import { SnackBarService } from '../../service/snackBar.service';
import { Ipost } from '../../model/Ipost';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  editObjtoPatch !: Ipost;
  @ViewChild('postForm') postForm!:NgForm

  isInEditMode : boolean = false;

  constructor(private _postService : PostService , private _snackBar : SnackBarService) { }

  ngOnInit(): void {
    this. onEdit()
  }

  onAddPost(){
    if(this.postForm.valid){
      let NEW_OBJ ={
       ... this.postForm.value,
       postId : Date.now()
      }
      this._postService.createNewPost(NEW_OBJ)
      .subscribe({
        next : data =>{
          this._snackBar.openSnackBar(data.msg);
          this.postForm.reset();
        },
        error : err =>{
          this._snackBar.openSnackBar(err)
        }
      })
      
    }

  }

  onEdit(){
    this._postService.editObjObs.subscribe({
      next: data =>{
        this.editObjtoPatch = data;
        this.isInEditMode = true;
        this.postForm.form.patchValue(data);
      }
    })
  }

  onUpdate(){
    if(this.postForm.valid){
      let UPDATED_OBJ : Ipost = {
        ...this.postForm.value,
        postId : this.editObjtoPatch.postId
      }
      this._postService.onupdate(UPDATED_OBJ)
      .subscribe({
        next : data => {
          this._snackBar.openSnackBar(data.msg);
          this.isInEditMode = false;
          this.postForm.reset()
        }
      })
    }
  }

}
