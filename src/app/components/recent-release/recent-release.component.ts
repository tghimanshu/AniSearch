import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { LatestRelease } from 'src/app/models/lists.model';
import { AnimesService } from 'src/app/service/animes.service';

@Component({
  selector: 'app-recent-release',
  templateUrl: './recent-release.component.html',
  styleUrls: ['./recent-release.component.css'],
})
export class RecentReleaseComponent implements OnInit {
  latestReleases: LatestRelease[] = [];
  subOrDub = 'sub';
  currentPage = 1;

  constructor(private animesService: AnimesService) {}

  ngOnInit(): void {
    this.animesService.getRecentReleases(this.subOrDub).subscribe((data) => {
      this.latestReleases = data;
    });
  }
  changeList(event: MatButtonToggleChange) {
    this.subOrDub = event.value;
    this.animesService.getRecentReleases(event.value).subscribe((data) => {
      this.latestReleases = data;
    });
  }
  addPage() {
    this.currentPage++;
    this.animesService
      .getRecentReleases(this.subOrDub, this.currentPage)
      .subscribe((data) => {
        this.latestReleases.push(...data);
      });
  }
}
