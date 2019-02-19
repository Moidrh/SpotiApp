import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  loading: boolean;

  artista: any = {};
  toptracks: any[] = [];

  constructor( private _router: ActivatedRoute, private _spotify: SpotifyService) {
    this._router.params.subscribe(
      params => {
        this.getArtist( params['id']);
        this.getTopTracks( params['id']);
      });
  }

  getArtist ( id: string) {
    this.loading = true;
    this._spotify.getArtist(id).subscribe( artista => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTracks ( id: string) {
    this._spotify.getTopTracks( id ).subscribe(
      toptracks => {
        console.log(toptracks);
        this.toptracks = toptracks;
      });

  }

  ngOnInit() {
  }

}
