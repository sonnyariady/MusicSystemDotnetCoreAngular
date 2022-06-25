using MusicAPI.Models;
using MusicAPI.RequestModel;
using MusicAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.Interfaces
{
    public interface IMusicServices
    {
        Task<PostCommandResult> Create(ArtistRequest artists);
        Task<PostCommandResult> Update(int id, ArtistRequest artists);
        Task<PostCommandResult> Delete(int id);
        Task<ArtistViewModel> GetById(int id);
        Task<List<ArtistViewModel>> GetAll();
    }
}
