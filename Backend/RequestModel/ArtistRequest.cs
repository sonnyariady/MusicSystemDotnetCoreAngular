using MusicAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.RequestModel
{
    public class ArtistRequest
    {
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string ImageUrl { get; set; }
        public string ReleaseDate { get; set; }
        public decimal Price { get; set; }
        public string SampleUrl { get; set; }

        public Artists toEntity()
        {
            Artists artists = new Artists();
            artists.AlbumName = this.AlbumName;
            artists.ArtistName = this.ArtistName;
            artists.ImageUrl = this.ImageUrl;
            
            artists.Price = this.Price;
            artists.SampleUrl = this.SampleUrl;

            int strYear = Convert.ToInt32(ReleaseDate.Substring(0, 4));
            int strMonth = Convert.ToInt32(ReleaseDate.Substring(4, 2));
            int strDay = Convert.ToInt32(ReleaseDate.Substring(6, 2));
            artists.ReleaseDate = new DateTime(strYear, strMonth, strDay);

            return artists;
        }

    }
}
