(module
  (memory 1) ;; 64 KB page of memory
  (global $index_counter (mut i32) (i32.const 0))

  (func $set (param $index i32) (param $val i32) (result i32)
    (i32.store
      (global.get $index_counter)
      (local.get $val)
    )
    (global.set $index_counter
      (i32.add
        (global.get $index_counter)
        (i32.const 1)
      )
    )
    (global.get $index_counter)
  )

  (func $get (param $index i32) (result i32)
    (i32.load
      (local.get $index)
    )
  )

  (export "set" (func $set))
  (export "get" (func $get))
)
