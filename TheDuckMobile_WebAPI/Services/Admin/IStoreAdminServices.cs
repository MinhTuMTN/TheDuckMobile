﻿using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Response.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IStoreAdminServices
    {
        public Task<List<StoreListResponse>> GetAllStores();
        public Task<bool> DeleteStore(string storeId);
        public Task<Entities.Store?> RestoreStore(string storeId);
        public Task<Entities.Store> GetStoreById(string storeId);
    }
}