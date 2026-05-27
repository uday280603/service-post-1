import { Injectable } from '@angular/core';
import { Ipost, Ires } from '../model/Ipost';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {


  private editObjSub$ : Subject<Ipost> = new Subject<Ipost>();
  editObjObs : Observable<Ipost> = this.editObjSub$.asObservable()
  postArr: Ipost[] = [
    {
      postId: 1,
      title: 'Angular CRUD Project',
      description: 'Learning CRUD operations using Angular.',
    },
    {
      postId: 2,
      title: 'Spring Boot API',
      description: 'Building REST APIs with Spring Boot.',
    },
  ];

  constructor() {}

  fetchAll() : Observable<Ipost[]>{
    return of(this.postArr)

  }

  createNewPost(newObj : Ipost) : Observable<Ires<Ipost>>{
    this.postArr.unshift(newObj)
    return of({
      msg : `New Post with id${newObj.postId} is Added Successfully..!`,
      data : newObj
    })
  }

  emitEditObj(editObj : Ipost){
    this.editObjSub$.next(editObj)

  }

  onupdate(updatedObj : Ipost) : Observable<Ires<Ipost>>{
    let GETINDEX = this.postArr.findIndex(p => p.postId === updatedObj.postId);
    this.postArr[GETINDEX] = updatedObj;
    return of({
      msg : `Post with id ${updatedObj.postId} isUpdated Successfully...!`,
      data : updatedObj
    })

  }

  onRemove(removeId : number) : Observable<Ires<Ipost>>{
    let GET_INDEX = this.postArr.findIndex(p => p.postId === removeId);
    let arr =  this.postArr.splice(GET_INDEX,1);
    return of({
      msg  : `Post with id ${removeId} is Removed Successfully..`,
      data : arr[0]
    })
   }
}
