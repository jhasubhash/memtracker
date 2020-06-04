#pragma once
#include <iostream>
namespace memory_manager{
uint32_t getWasmMemorySize();
void tryAllocationToWasmFromJS();
void tryAllocationToJSFromWasm();
}