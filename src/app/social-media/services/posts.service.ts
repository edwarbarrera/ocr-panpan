import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from "@angular/core";
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()

export class PostsService implements OnInit {


  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiURL}/posts`)

  }

  addNewComment(postCommented: { comment: string, postId: number }) {

    console.log(postCommented);

  }
}
