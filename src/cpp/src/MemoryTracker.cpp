#include "../inc/MemoryTracker.h"

uint32_t totalSize = 0;

void * operator new(std::size_t size){
    void * mem = std::malloc(sizeof(size_t) + size);
    *(size_t*)mem = size;
    totalSize += size + sizeof(size_t);
    return (void*)&((size_t*)mem)[1];
}

void operator delete(void * mem) throw() {
    totalSize -= ((size_t*)mem)[-1] + sizeof(size_t);
    std::free((size_t*)mem - 1);
}

uint32_t memory_manager::getWasmMemorySize(){
    return totalSize;
}