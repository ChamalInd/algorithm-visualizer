cmake_minimum_required(VERSION 3.16)
project(algorithm_visualizer CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS "${CMAKE_SOURCE_DIR}/cpp/*.cpp")

add_executable(engine ${SOURCES})

target_include_directories(engine PRIVATE "${CMAKE_SOURCE_DIR}/cpp")

set_target_properties(engine PROPERTIES
    SUFFIX ".js"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/web/wasm"
)

target_link_options(engine PRIVATE
    -lembind
 	-sMODULARIZE=1   
	-sEXPORT_NAME=createModule
    -sALLOW_MEMORY_GROWTH=1
)
