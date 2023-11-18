﻿using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IAddressAdminServices
    {
        public Task<List<ProvinceListResponse>> GetAllProvinces();
    }
}