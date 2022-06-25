using MusicAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.ViewModels
{
    public class ArtistViewModel
    {
        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string ImageUrl { get; set; }
        public string ReleaseDate { get; set; }
        public decimal Price { get; set; }
        public string SampleUrl { get; set; }

        public ArtistViewModel(Artists entity)
        {
            this.ArtistId = entity.ArtistId;
            this.ArtistName = entity.ArtistName;
            this.AlbumName = entity.AlbumName;
            this.ImageUrl = entity.ImageUrl;
            this.Price = entity.Price;
            this.SampleUrl = entity.SampleUrl;
            this.ReleaseDate = entity.ReleaseDate.ToString("yyyyMMdd");
        }

    }
}
