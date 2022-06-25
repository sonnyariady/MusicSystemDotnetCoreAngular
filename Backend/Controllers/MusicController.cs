using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicAPI.Interfaces;
using MusicAPI.Models;
using MusicAPI.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IMusicServices _musicServices;
        public MusicController(IMusicServices musicServices)
        {
            _musicServices = musicServices;
        }

        [HttpGet("GetAll")]

        public async Task<IActionResult> GetAll()
        {
            var result = await _musicServices.GetAll();             
            return Ok(result);

        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(ArtistRequest input)
        {
            var result = await _musicServices.Create(input);

            if (result.IsSuccess)
            {
                
                return Ok(result);
            }
            else
            {                 
                return BadRequest(result);
            }

        }

        [HttpPut("{id}/Update")]
        public async Task<IActionResult> Update(int id, ArtistRequest input)
        {
            var result = await _musicServices.Update(id, input);

            if (result.IsSuccess)
            {               
                return Ok(result);
            }
            else
            {               
                return BadRequest(result);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _musicServices.GetById(id);
            if (result != null)
            {                
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _musicServices.Delete(id);

            if (result.IsSuccess)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }

        }

    }
}
