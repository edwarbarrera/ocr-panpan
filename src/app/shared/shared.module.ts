import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UserIdentifier } from './pipes/userIdentifier.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { HighlightDirective } from './directive/highlight.directive';
import { BlurImageDirective } from './directive/blurimage.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UserIdentifier,
    TimeAgoPipe,
    HighlightDirective,
    BlurImageDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
  ],
  exports:[
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    UserIdentifier,
    TimeAgoPipe,
    HighlightDirective,
    BlurImageDirective,


  ]
})
export class SharedModule { }

