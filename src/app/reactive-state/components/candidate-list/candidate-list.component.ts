
import { CandidatesService } from './../../services/candidate.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!:{
    value: CandidateSearchType,
    label: string,
  }[];


  constructor(private candidateService:CandidatesService,
              private fb: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidateService.getCandidatesFromServer();

  }

  private initForm() {
    this.searchCtrl = this.fb.control('');
    this.searchTypeCtrl = this.fb.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      {value: CandidateSearchType.LASTNAME, label: 'Nom'},
      {value: CandidateSearchType.FIRSTNAME, label: 'PréNom'},
      {value: CandidateSearchType.COMPANY, label: 'Bouclard'},
    ];
  }


  private initObservables(){
    this.loading$ = this.candidateService.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase()),
    );

    const searchType$: Observable<CandidateSearchType> =  this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );

    this.candidates$ =  combineLatest([
      search$,
      searchType$,
      this.candidateService.candidates$,
    ]).pipe(
      map(([search ,searchType , candidates]) => candidates.filter(
       candidate=>candidate[searchType]
       .toLowerCase()
       .includes(search)
      ) ));
  }
}
