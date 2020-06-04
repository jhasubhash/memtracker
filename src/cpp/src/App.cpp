#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <iostream>
#include "../inc/App.h"
#include "../inc/MemoryTracker.h"

using namespace emscripten;

class WasmObject {
public:
  WasmObject(){};
  void someFunction(){};
};

EMSCRIPTEN_BINDINGS(ClassBinding) {
  class_<WasmObject>("WasmObject")
    .constructor()
    .function("someFunction", &WasmObject::someFunction)
    ;
}

void tryAllocationToWasmFromJS(int size_in_mb){
    char* ptr = new char[size_in_mb*1024*1024];
    // std::cout<<"wasm size :"<<memory_manager::getWasmMemorySize()<<std::endl;
    // delete[] ptr; 
}

void tryAllocationToJSFromWasm(){
    emscripten::val::global().call<void>("_tryAllocationToJSFromWasm");
}

void print(std::string msg){
    std::cout<<"printing in wasm side "<<msg<<std::endl;
}

void setNumber(int num){
    int n = num;
}

int getNumber(){
    return 23;
}

void setString(std::string s){
    std::string str = s;
}

std::string getString(){
    std::string res = "hello";
    return res;
}

EMSCRIPTEN_BINDINGS(FunctionBindings)
{
    function("print", &print);
    function("setNumber", &setNumber);
    function("getNumber", &getNumber);
    function("setString", &setString);
    function("getString", &getString);
    function("getWasmMemorySize", &memory_manager::getWasmMemorySize);
    function("tryAllocationToWasm", &tryAllocationToWasmFromJS);
    function("tryAllocationToJS", &tryAllocationToJSFromWasm);
}