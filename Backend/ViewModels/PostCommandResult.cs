using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAPI.ViewModels
{
    public class PostCommandResult
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public PostCommandResult()
        {
            this.IsSuccess = true;
            this.ErrorMessage = string.Empty;
        }
    }
}
