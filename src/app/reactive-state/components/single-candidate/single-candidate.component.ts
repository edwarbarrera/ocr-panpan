import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CandidatesService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SingleCandidateComponent {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidatesService: CandidatesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }
  onHire() { }
  onRefuse() { }
  onGoBack() { }
}
