using Microsoft.EntityFrameworkCore;
using MusicAPI.Interfaces;
using MusicAPI.Models;
using MusicAPI.RequestModel;
using MusicAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.Services
{
    public class MusicServices : IMusicServices
    {
        private readonly dbmusicContext _context;

        public MusicServices(dbmusicContext context)
        {
            this._context = context;
        }

        public async Task<PostCommandResult> Create(ArtistRequest artists)
        {
            PostCommandResult result = new PostCommandResult();
            try
            {
                await _context.Artists.AddAsync(artists.toEntity());
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.ErrorMessage = ex.Message;               
            }
            return result;
        }

        public async Task<PostCommandResult> Update(int id, ArtistRequest artists)
        {
            PostCommandResult result = new PostCommandResult();
            try
            {
                var artistupdate = await _context.Artists.FindAsync(id);
                if (artistupdate == null)
                {
                    throw new Exception("This artist id is not registered");
                }

                var reqtoentity = artists.toEntity();

                artistupdate.AlbumName = reqtoentity.AlbumName;
                artistupdate.ArtistName = reqtoentity.ArtistName;
                artistupdate.ImageUrl = reqtoentity.ImageUrl;
                artistupdate.Price = reqtoentity.Price;
                artistupdate.ReleaseDate = reqtoentity.ReleaseDate;
                artistupdate.SampleUrl = reqtoentity.SampleUrl;
                _context.Entry(artistupdate).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.ErrorMessage = ex.Message;
            }
            return result;
        }

        public async Task<PostCommandResult> Delete(int id)
        {
            PostCommandResult result = new PostCommandResult();
            try
            {
                var oArtist = await _context.Artists.FindAsync(id);
                if (oArtist == null)
                {
                    throw new Exception("Artists is not found.");
                }
                _context.Artists.Remove(oArtist);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<ArtistViewModel> GetById(int id)
        {

            var oArtist = await _context.Artists.FindAsync(id);

            ArtistViewModel artistView = new ArtistViewModel(oArtist);

            return artistView;
        }

        public async Task<List<ArtistViewModel>> GetAll()
        {
            var lstqry = await _context.Artists.ToListAsync();
            List<ArtistViewModel> lst = new List<ArtistViewModel>();
            foreach (var item in lstqry)
            {
                lst.Add(new ArtistViewModel(item));
            }
            return lst;

        }


    }
}
