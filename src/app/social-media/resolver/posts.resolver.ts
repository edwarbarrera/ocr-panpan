import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { Injectable, inject } from "@angular/core";
import { PostsService } from "../services/posts.service";


// @Injectable()
// export class PostsResolver implements Resolve<Post[]>{
// constructor(private postsService:PostsService){}


  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Post[]>  {
  //   return this.postsService.getPosts();
  // }

  export const PostsResolver: ResolveFn<Post[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PostsService).getPosts();
  }

