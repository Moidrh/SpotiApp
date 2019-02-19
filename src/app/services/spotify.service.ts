import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private _http: HttpClient) { }

  getQuery( query: string) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer QAwcMbfaqT-FGyyeswTMrKd6Sx-1QQmQ7LxptdABaRq2P-GNPmETuO2Esy0pINfvUJBDEtI6icm2yrW1ao',
    });

    return this._http.get(url, { headers});

  }

  getNewReleases() {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDgTUUQUKHZe26lOS_Qtovu3TlF-QFoYlNlEkIzhQxGHyFmxX3y16O2kqljmxhvooTKxwTrUk_EDqagrsg',
    // });

    // return this._http.get(	'https://api.spotify.com/v1/browse/new-releases', { headers })
    //         .pipe( map( data => {
    //           return data['albums'].items;
    //         } ) );

    return this.getQuery('browse/new-releases')
            .pipe( map( data => {
              return data['albums'].items;
            }));
  }

  getArtists( termino: string) {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDgTUUQUKHZe26lOS_Qtovu3TlF-QFoYlNlEkIzhQxGHyFmxX3y16O2kqljmxhvooTKxwTrUk_EDqagrsg',
    // });

    // return this._http.get( `https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    //         .pipe( map( data => {
    //             return data['artists'].items;
    //           }));

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
            .pipe( map( data => {
              return data['artists'].items;
            }));

  }

  getArtist ( id: string ) {

    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => {
    //     data['artists'].item;
    //   }));

  }

  getTopTracks ( id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe(map( data => data['tracks']));
  }
}
